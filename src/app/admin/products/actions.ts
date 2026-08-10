"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { requireAuth } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";

export type DbProduct = typeof products.$inferSelect;
export type NewDbProduct = typeof products.$inferInsert;

export async function getDbProducts(): Promise<DbProduct[]> {
  try {
    const allProducts = await db.select().from(products).orderBy(desc(products.sortOrder));
    return allProducts;
  } catch (error) {
    console.error("Failed to fetch products from db:", error);
    return [];
  }
}

export async function getDbProductById(id: string): Promise<DbProduct | null> {
  try {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    return null;
  }
}

function extractProductData(formData: FormData) {
  return {
    name: formData.get("name") as string,
    caption: formData.get("caption") as string | null,
    sareeType: formData.get("sareeType") as string,
    price: formData.get("price") as string,
    originalPrice: formData.get("originalPrice") as string | null,
    collection: formData.get("collection") as string,
    isNewArrival: formData.get("isNewArrival") === "true",
    isFeatured: formData.get("isFeatured") === "true",
    isActive: formData.get("isActive") === "true",
    sortOrder: parseInt(formData.get("sortOrder") as string) || 0,
  };
}

export async function createDbProduct(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    
    const data = extractProductData(formData);
    const imageFile = formData.get("image") as File | null;
    
    if (!data.name || !data.sareeType || !data.collection) {
      return { success: false, error: "Missing required fields" };
    }
    
    let imageUrl = "";
    
    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > 8 * 1024 * 1024) {
        return { success: false, error: "File too large (max 8MB)" };
      }
      const uniqueFilename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const blob = await put(`products/${uniqueFilename}`, imageFile, { access: 'public' });
      imageUrl = blob.url;
    }
    
    if (!imageUrl) {
      return { success: false, error: "Product image is required" };
    }

    try {
      await db.insert(products).values({
        ...data,
        imageUrl,
      });
    } catch (dbError: any) {
      // Cleanup blob if DB fails
      if (imageUrl) {
        try {
          await del(imageUrl);
        } catch (cleanupError) {
          console.error("Failed to clean up blob after DB error:", cleanupError);
        }
      }
      throw dbError;
    }

    revalidatePath("/admin/products");
    revalidatePath("/");
    revalidatePath("/new-arrivals");
    revalidatePath("/collections");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create product:", error);
    return { success: false, error: error.message || "Failed to create product" };
  }
}

export async function updateDbProduct(id: string, formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    
    const data = extractProductData(formData);
    const imageFile = formData.get("image") as File | null;
    
    if (!data.name || !data.sareeType || !data.collection) {
      return { success: false, error: "Missing required fields" };
    }
    
    let newImageUrl = "";
    
    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > 8 * 1024 * 1024) {
        return { success: false, error: "File too large (max 8MB)" };
      }
      const uniqueFilename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const blob = await put(`products/${uniqueFilename}`, imageFile, { access: 'public' });
      newImageUrl = blob.url;
    }

    const existingProduct = await getDbProductById(id);
    if (!existingProduct) {
      // If we just uploaded a new image but the product doesn't exist, clean it up
      if (newImageUrl) await del(newImageUrl).catch(() => {});
      return { success: false, error: "Product not found" };
    }

    const finalImageUrl = newImageUrl || existingProduct.imageUrl;

    try {
      await db.update(products).set({ 
        ...data, 
        imageUrl: finalImageUrl,
        updatedAt: new Date() 
      }).where(eq(products.id, id));
      
      // Cleanup old image only after successful DB update
      if (newImageUrl && existingProduct.imageUrl) {
        try {
          await del(existingProduct.imageUrl);
        } catch (cleanupError) {
          console.error("Failed to clean up old blob image:", cleanupError);
        }
      }
    } catch (dbError: any) {
      // Cleanup new image if DB update fails
      if (newImageUrl) {
        try {
          await del(newImageUrl);
        } catch (cleanupError) {
          console.error("Failed to clean up new blob after DB error:", cleanupError);
        }
      }
      throw dbError;
    }

    revalidatePath("/admin/products");
    revalidatePath("/");
    revalidatePath("/new-arrivals");
    revalidatePath("/collections");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update product:", error);
    return { success: false, error: error.message || "Failed to update product" };
  }
}

export async function deleteDbProduct(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    
    const existingProduct = await getDbProductById(id);
    if (!existingProduct) {
      return { success: false, error: "Product not found" };
    }

    await db.delete(products).where(eq(products.id, id));
    
    if (existingProduct.imageUrl) {
      try {
        await del(existingProduct.imageUrl);
      } catch (cleanupError) {
        console.error("Failed to delete blob image for product:", cleanupError);
      }
    }

    revalidatePath("/admin/products");
    revalidatePath("/");
    revalidatePath("/new-arrivals");
    revalidatePath("/collections");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete product:", error);
    return { success: false, error: error.message || "Failed to delete product" };
  }
}

export async function toggleDbProductStatus(
  id: string, 
  field: "isActive" | "isFeatured" | "isNewArrival",
  currentValue: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    await db.update(products).set({ [field]: !currentValue, updatedAt: new Date() }).where(eq(products.id, id));
    revalidatePath("/admin/products");
    revalidatePath("/");
    revalidatePath("/new-arrivals");
    revalidatePath("/collections");
    return { success: true };
  } catch (error: any) {
    console.error(`Failed to toggle ${field}:`, error);
    return { success: false, error: error.message || `Failed to toggle ${field}` };
  }
}
