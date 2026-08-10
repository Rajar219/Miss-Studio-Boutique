import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, and, asc, desc } from "drizzle-orm";
import type { Product } from "./products";

type DbProductRow = typeof products.$inferSelect;

/**
 * Maps a Neon/Drizzle database row to the public-facing Product shape
 * used by ProductCard, ProductGallery, CartContext, and all UI components.
 */
function mapDbToPublicProduct(p: DbProductRow): Product {
  return {
    id: p.id,
    name: p.name,
    collection: p.collection ?? "",
    images: [p.imageUrl ?? ""],
    price: parseFloat(p.price),
    offerPrice: p.originalPrice ? parseFloat(p.originalPrice) : null,
    fabric: p.fabric ?? p.sareeType ?? "Handwoven Silk",
    color: p.color ?? "Assorted",
    stock: p.stock ?? 0,
    sku: p.sku ?? p.id.slice(0, 8).toUpperCase(),
    description: p.caption ?? "",
    featured: p.isFeatured ?? false,
    trending: p.isFeatured ?? false,
    newArrival: p.isNewArrival ?? false,
    sareeType: p.sareeType ?? undefined,
    category: p.collection ?? undefined,
    status: (p.stock ?? 0) > 0 ? "active" : "out_of_stock",
  };
}

/**
 * Fetch all active public products, optionally filtered by collection name.
 * Only products with isActive=true are returned.
 * Ordered by sortOrder (ASC) then createdAt (DESC).
 */
export async function getPublicProducts(collectionFilter?: string): Promise<Product[]> {
  try {
    const conditions = collectionFilter
      ? and(eq(products.isActive, true), eq(products.collection, collectionFilter))
      : eq(products.isActive, true);

    const rows = await db
      .select()
      .from(products)
      .where(conditions)
      .orderBy(asc(products.sortOrder), desc(products.createdAt));

    return rows.map(mapDbToPublicProduct);
  } catch (error) {
    console.error("Failed to fetch public products from DB:", error);
    return [];
  }
}

/**
 * Fetch a single active product by its UUID.
 * Returns null if not found or if inactive (inactive = hidden from public).
 */
export async function getPublicProductById(id: string): Promise<Product | null> {
  try {
    const rows = await db
      .select()
      .from(products)
      .where(and(eq(products.id, id), eq(products.isActive, true)));

    return rows.length > 0 ? mapDbToPublicProduct(rows[0]) : null;
  } catch (error) {
    console.error(`Failed to fetch product ${id} from DB:`, error);
    return null;
  }
}

/**
 * Fetch related products in the same collection, excluding the current product.
 */
export async function getPublicRelatedProducts(
  collection: string,
  currentProductId: string
): Promise<Product[]> {
  try {
    const rows = await db
      .select()
      .from(products)
      .where(and(eq(products.collection, collection), eq(products.isActive, true)))
      .orderBy(asc(products.sortOrder))
      .limit(5);

    return rows
      .map(mapDbToPublicProduct)
      .filter((p) => p.id !== currentProductId)
      .slice(0, 4);
  } catch (error) {
    console.error("Failed to fetch related products:", error);
    return [];
  }
}

/**
 * Fetch featured active products for the homepage.
 */
export async function getPublicFeaturedProducts(limit = 4): Promise<Product[]> {
  try {
    const rows = await db
      .select()
      .from(products)
      .where(and(eq(products.isActive, true), eq(products.isFeatured, true)))
      .orderBy(asc(products.sortOrder))
      .limit(limit);

    return rows.map(mapDbToPublicProduct);
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
    return [];
  }
}

/**
 * Fetch new arrival active products.
 */
export async function getPublicNewArrivals(limit?: number): Promise<Product[]> {
  try {
    const query = db
      .select()
      .from(products)
      .where(and(eq(products.isActive, true), eq(products.isNewArrival, true)))
      .orderBy(asc(products.sortOrder), desc(products.createdAt));

    const rows = limit ? await query.limit(limit) : await query;
    return rows.map(mapDbToPublicProduct);
  } catch (error) {
    console.error("Failed to fetch new arrivals:", error);
    return [];
  }
}
