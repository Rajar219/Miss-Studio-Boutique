"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Product, saveProduct } from "@/lib/products";
import { Collection } from "@/lib/collections";
import { UploadCloud, ArrowLeft, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ImageUploader from "@/components/admin/ImageUploader";

export default function ProductForm({ 
  initialData, 
  collections 
}: { 
  initialData?: Product,
  collections: Collection[]
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>(
    initialData || {
      name: "",
      sku: "",
      collection: collections[0]?.name || "Bridal",
      images: [],
      price: 0,
      offerPrice: null,
      fabric: "",
      color: "",
      stock: 0,
      description: "",
      featured: false,
      trending: false,
      newArrival: false,
    }
  );

  const [previewImages, setPreviewImages] = useState<string[]>(initialData?.images || []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);

    const newUrls: string[] = [];

    // Process uploads sequentially to avoid overloading local API easily
    for (const file of files) {
      const data = new FormData();
      data.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });
        const result = await res.json();
        
        if (res.ok) {
          newUrls.push(result.url);
        } else {
          alert(`Failed to upload ${file.name}: ${result.error}`);
        }
      } catch (error) {
        console.error("Upload failed", error);
        alert(`Failed to upload ${file.name}`);
      }
    }

    setPreviewImages(prev => [...prev, ...newUrls]);
    setFormData(prev => ({ ...prev, images: [...(prev.images || []), ...newUrls] }));
    setUploading(false);
  };

  const removeImage = (indexToRemove: number) => {
    setPreviewImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
    setFormData(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.images || formData.images.length === 0) {
      alert("Please upload at least one image.");
      setLoading(false);
      return;
    }

    const res = await saveProduct(formData as Product);
    if (res.success) {
      router.push("/admin/products");
      router.refresh();
    } else {
      alert(res.error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 text-gray-500 hover:text-wine hover:bg-wine/5 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-serif text-wine font-bold">
            {initialData ? "Edit Product" : "Add Product"}
          </h1>
          <p className="text-gray-500 mt-1">
            {initialData ? "Update the product details below." : "Create a new product for your store."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          <h2 className="text-xl font-serif text-wine font-semibold border-b border-gray-100 pb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/20 focus:border-wine outline-none transition-all"
                placeholder="e.g. Red Banarasi Silk Saree"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Collection</label>
              <select
                required
                value={formData.collection}
                onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/20 focus:border-wine outline-none transition-all bg-white"
              >
                {collections.map(col => (
                  <option key={col.id} value={col.name}>{col.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/20 focus:border-wine outline-none transition-all resize-none"
              placeholder="Describe this product..."
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          <h2 className="text-xl font-serif text-wine font-semibold border-b border-gray-100 pb-4">Images</h2>
          
          <div className="space-y-4">
            <ImageUploader 
              folder="products" 
              multiple={true} 
              value={formData.images || []} 
              onChange={(urls) => setFormData({ ...formData, images: urls as string[] })} 
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          <h2 className="text-xl font-serif text-wine font-semibold border-b border-gray-100 pb-4">Inventory & Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">SKU</label>
              <input 
                type="text" 
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/20 focus:border-wine outline-none transition-all"
                placeholder="e.g. MS-BRL-001"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
              <input 
                type="number" 
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/20 focus:border-wine outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input 
                type="number" 
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/20 focus:border-wine outline-none transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Offer Price ($) <span className="text-gray-400 font-normal">(Optional)</span></label>
              <input 
                type="number"
                min="0"
                step="0.01"
                value={formData.offerPrice || ''}
                onChange={(e) => setFormData({ ...formData, offerPrice: e.target.value ? parseFloat(e.target.value) : null })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/20 focus:border-wine outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Fabric</label>
              <input 
                type="text"
                value={formData.fabric}
                onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/20 focus:border-wine outline-none transition-all"
                placeholder="e.g. Pure Silk"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <input 
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/20 focus:border-wine outline-none transition-all"
                placeholder="e.g. Crimson Red"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
          <h2 className="text-xl font-serif text-wine font-semibold border-b border-gray-100 pb-4">Status & Visibility</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-100 bg-amber-50/50">
              <input 
                type="checkbox" 
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="mt-1 w-5 h-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="featured" className="cursor-pointer">
                <span className="block font-medium text-amber-900">Featured</span>
                <span className="block text-sm text-amber-700/80 mt-1">Show on the homepage featured section.</span>
              </label>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl border border-purple-100 bg-purple-50/50">
              <input 
                type="checkbox" 
                id="trending"
                checked={formData.trending}
                onChange={(e) => setFormData({ ...formData, trending: e.target.checked })}
                className="mt-1 w-5 h-5 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="trending" className="cursor-pointer">
                <span className="block font-medium text-purple-900">Trending</span>
                <span className="block text-sm text-purple-700/80 mt-1">Mark as a trending product.</span>
              </label>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl border border-blue-100 bg-blue-50/50">
              <input 
                type="checkbox" 
                id="newArrival"
                checked={formData.newArrival}
                onChange={(e) => setFormData({ ...formData, newArrival: e.target.checked })}
                className="mt-1 w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="newArrival" className="cursor-pointer">
                <span className="block font-medium text-blue-900">New Arrival</span>
                <span className="block text-sm text-blue-700/80 mt-1">Highlight as recently added.</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 sticky bottom-6 z-10">
          <Link 
            href="/admin/products"
            className="px-6 py-4 rounded-xl bg-white shadow-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button 
            type="submit"
            disabled={loading || uploading}
            className="px-8 py-4 rounded-xl bg-wine shadow-lg shadow-wine/30 text-white font-bold hover:bg-wine/90 transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {initialData ? "Save Changes" : "Publish Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
