"use server";

import fs from 'fs/promises';
import path from 'path';

export interface Product {
  id: string;
  name: string;
  collection: string;
  images: string[];
  price: number;
  offerPrice: number | null;
  fabric: string;
  color: string;
  stock: number;
  sku: string;
  description: string;
  featured: boolean;
  trending: boolean;
  newArrival: boolean;
  category?: string;
  occasion?: string;
  sareeType?: string;
}

const getProductsFilePath = () => {
  return path.join(process.cwd(), 'src', 'data', 'products.json');
};

export async function getProducts(collectionFilter?: string): Promise<Product[]> {
  try {
    const data = await fs.readFile(getProductsFilePath(), 'utf-8');
    const products: Product[] = JSON.parse(data);

    if (collectionFilter && collectionFilter !== "All") {
      return products.filter((p) => p.collection.toLowerCase() === collectionFilter.toLowerCase());
    }
    return products;
  } catch (error) {
    console.error("Failed to read products:", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.id === id) || null;
}

export async function getRelatedProducts(collection: string, currentProductId: string): Promise<Product[]> {
  const products = await getProducts();
  return products
    .filter((p) => p.collection === collection && p.id !== currentProductId)
    .slice(0, 4);
}

export async function saveProduct(product: Product): Promise<{ success: boolean; error?: string }> {
  try {
    const products = await getProducts();
    const index = products.findIndex(p => p.id === product.id);
    
    if (index >= 0) {
      // Update
      products[index] = product;
    } else {
      // Create
      if (!product.id) {
        product.id = `prod-${Date.now()}`;
      }
      products.push(product);
    }

    await fs.writeFile(getProductsFilePath(), JSON.stringify(products, null, 2));
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save product:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const products = await getProducts();
    const updatedProducts = products.filter(p => p.id !== id);
    
    if (products.length === updatedProducts.length) {
      return { success: false, error: "Product not found" };
    }

    await fs.writeFile(getProductsFilePath(), JSON.stringify(updatedProducts, null, 2));
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete product:", error);
    return { success: false, error: error.message };
  }
}

export async function toggleProductStatus(id: string, field: 'featured' | 'trending' | 'newArrival'): Promise<{ success: boolean; error?: string }> {
  try {
    const products = await getProducts();
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return { success: false, error: "Product not found" };
    }

    product[field] = !product[field];
    await fs.writeFile(getProductsFilePath(), JSON.stringify(products, null, 2));
    return { success: true };
  } catch (error: any) {
    console.error(`Failed to toggle ${field}:`, error);
    return { success: false, error: error.message };
  }
}
