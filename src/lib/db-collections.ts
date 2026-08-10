"use server";

import { db } from "@/db";
import { collections } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { requireAuth } from "./auth";

export interface DbCollectionRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  featured: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  coverImage: string;
  description: string;
  featured: boolean;
}

function mapDbToCollection(c: DbCollectionRow): Collection {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description || "",
    coverImage: c.coverImage || "",
    featured: c.featured || false,
  };
}

export async function getDbCollections(): Promise<Collection[]> {
  try {
    const data = await db
      .select()
      .from(collections)
      .orderBy(desc(collections.createdAt));
    return data.map(mapDbToCollection);
  } catch (error) {
    console.error("Failed to read collections:", error);
    return [];
  }
}

export async function getDbCollectionBySlug(slug: string): Promise<Collection | null> {
  try {
    const data = await db
      .select()
      .from(collections)
      .where(eq(collections.slug, slug))
      .limit(1);
    
    if (data.length === 0) return null;
    return mapDbToCollection(data[0]);
  } catch (error) {
    console.error("Failed to read collection:", error);
    return null;
  }
}

export async function getDbCollectionById(id: string): Promise<Collection | null> {
  try {
    const data = await db
      .select()
      .from(collections)
      .where(eq(collections.id, id))
      .limit(1);
    
    if (data.length === 0) return null;
    return mapDbToCollection(data[0]);
  } catch (error) {
    console.error("Failed to read collection:", error);
    return null;
  }
}

export async function saveDbCollection(collection: Collection): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    
    // Check if updating
    if (collection.id && !collection.id.startsWith("col-")) {
      const existing = await db
        .select()
        .from(collections)
        .where(eq(collections.id, collection.id))
        .limit(1);
        
      if (existing.length > 0) {
        await db
          .update(collections)
          .set({
            name: collection.name,
            slug: collection.slug,
            description: collection.description,
            coverImage: collection.coverImage,
            featured: collection.featured,
            updatedAt: new Date(),
          })
          .where(eq(collections.id, collection.id));
        return { success: true };
      }
    }
    
    // Insert new
    await db.insert(collections).values({
      name: collection.name,
      slug: collection.slug,
      description: collection.description,
      coverImage: collection.coverImage,
      featured: collection.featured,
    });
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save collection:", error);
    // Unique constraint on slug
    if (error.code === '23505') {
      return { success: false, error: "A collection with this slug already exists." };
    }
    return { success: false, error: error.message };
  }
}

export async function deleteDbCollection(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    await db.delete(collections).where(eq(collections.id, id));
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete collection:", error);
    return { success: false, error: error.message };
  }
}

export async function toggleDbCollectionFeatured(id: string, currentFeatured: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    await db
      .update(collections)
      .set({ featured: !currentFeatured, updatedAt: new Date() })
      .where(eq(collections.id, id));
    return { success: true };
  } catch (error: any) {
    console.error("Failed to toggle collection:", error);
    return { success: false, error: error.message };
  }
}
