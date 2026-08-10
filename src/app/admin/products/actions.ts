"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { requireAuth } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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

export async function createDbProduct(data: NewDbProduct): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    await db.insert(products).values(data);
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create product:", error);
    return { success: false, error: error.message || "Failed to create product" };
  }
}

export async function updateDbProduct(id: string, data: Partial<NewDbProduct>): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    await db.update(products).set({ ...data, updatedAt: new Date() }).where(eq(products.id, id));
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update product:", error);
    return { success: false, error: error.message || "Failed to update product" };
  }
}

export async function deleteDbProduct(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    await db.delete(products).where(eq(products.id, id));
    revalidatePath("/admin/products");
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
    return { success: true };
  } catch (error: any) {
    console.error(`Failed to toggle ${field}:`, error);
    return { success: false, error: error.message || `Failed to toggle ${field}` };
  }
}
