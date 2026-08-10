"use server";

import fs from 'fs/promises';
import path from 'path';
import { requireAuth } from './auth';

export interface Collection {
  id: string;
  name: string;
  slug: string;
  coverImage: string;
  description: string;
  featured: boolean;
}

const getCollectionsFilePath = () => {
  return path.join(process.cwd(), 'src', 'data', 'collections.json');
};

export async function getCollections(): Promise<Collection[]> {
  try {
    const data = await fs.readFile(getCollectionsFilePath(), 'utf-8');
    return JSON.parse(data) as Collection[];
  } catch (error) {
    console.error("Failed to read collections:", error);
    return [];
  }
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  const collections = await getCollections();
  return collections.find((c) => c.slug === slug) || null;
}

export async function getCollectionById(id: string): Promise<Collection | null> {
  const collections = await getCollections();
  return collections.find((c) => c.id === id) || null;
}

export async function saveCollection(collection: Collection): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    const collections = await getCollections();
    const index = collections.findIndex(c => c.id === collection.id);
    
    if (index >= 0) {
      // Update
      collections[index] = collection;
    } else {
      // Create
      // If no ID is provided (though our interface requires it), generate one
      if (!collection.id) {
        collection.id = `col-${Date.now()}`;
      }
      collections.push(collection);
    }

    await fs.writeFile(getCollectionsFilePath(), JSON.stringify(collections, null, 2));
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save collection:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteCollection(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    const collections = await getCollections();
    const updatedCollections = collections.filter(c => c.id !== id);
    
    if (collections.length === updatedCollections.length) {
      return { success: false, error: "Collection not found" };
    }

    await fs.writeFile(getCollectionsFilePath(), JSON.stringify(updatedCollections, null, 2));
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete collection:", error);
    return { success: false, error: error.message };
  }
}

export async function toggleCollectionFeatured(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
    const collections = await getCollections();
    const collection = collections.find(c => c.id === id);
    
    if (!collection) {
      return { success: false, error: "Collection not found" };
    }

    collection.featured = !collection.featured;
    await fs.writeFile(getCollectionsFilePath(), JSON.stringify(collections, null, 2));
    return { success: true };
  } catch (error: any) {
    console.error("Failed to toggle collection:", error);
    return { success: false, error: error.message };
  }
}
