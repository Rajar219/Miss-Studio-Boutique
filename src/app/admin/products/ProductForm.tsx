"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Collection } from "@/lib/collections";
import { ArrowLeft, Loader2, UploadCloud, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DbProduct, NewDbProduct, createDbProduct, updateDbProduct } from "./actions";

export default function ProductForm({ 
  initialData, 
  collections 
}: { 
  initialData?: DbProduct,
  collections: Collection[]
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<NewDbProduct>>(
    initialData || {
      name: "",
      caption: "",
      sareeType: "",
      price: "0",
      originalPrice: "",
      collection: collections[0]?.name || "Bridal",
      imageUrl: "",
      isNewArrival: false,
      isFeatured: false,
      isActive: true,
      sortOrder: 0,
    }
  );

  useEffect(() => {
    return () => {
      if (imagePreview && !imagePreview.startsWith("http")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("Only JPEG, PNG, and WEBP formats are allowed.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      alert("File size must be less than 8MB.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(initialData?.imageUrl || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.sareeType || !formData.collection) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }
    
    if (!imagePreview) {
      alert("Please upload a product image.");
      setLoading(false);
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("caption", formData.caption || "");
    payload.append("sareeType", formData.sareeType);
    payload.append("price", formData.price || "0");
    payload.append("originalPrice", formData.originalPrice || "");
    payload.append("collection", formData.collection);
    payload.append("isNewArrival", String(formData.isNewArrival));
    payload.append("isFeatured", String(formData.isFeatured));
    payload.append("isActive", String(formData.isActive));
    payload.append("sortOrder", String(formData.sortOrder || 0));

    if (imageFile) {
      payload.append("image", imageFile);
    }

    let res;
    if (initialData?.id) {
      res = await updateDbProduct(initialData.id, payload);
    } else {
      res = await createDbProduct(payload);
    }

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
            {initialData ? "Update the product details below." : "Create a new product in the database."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          <h2 className="text-xl font-serif text-wine font-semibold border-b border-gray-100 pb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Product Name *</label>
              <input 
                type="text" 
                required
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/20 focus:border-wine outline-none transition-all"
                placeholder="e.g. Red Banarasi Silk Saree"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Caption</label>
              <input 
                type="text" 
                value={formData.caption || ""}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/20 focus:border-wine outline-none transition-all"
                placeholder="A short descriptive caption"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Saree Type *</label>
              <input 
                type="text" 
                required
                value={formData.sareeType || ""}
                onChange={(e) => setFormData({ ...formData, sareeType: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/20 focus:border-wine outline-none transition-all"
                placeholder="e.g. Banarasi, Kanjeevaram"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Collection *</label>
              <select
                required
                value={formData.collection || ""}
                onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/20 focus:border-wine outline-none transition-all bg-white"
              >
                {collections.map(col => (
                  <option key={col.id} value={col.name}>{col.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          <h2 className="text-xl font-serif text-wine font-semibold border-b border-gray-100 pb-4">Pricing & Image</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Price *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input 
                  type="number" 
                  step="0.01"
                  min="0"
                  required
                  value={formData.price || ""}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/20 focus:border-wine outline-none transition-all"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Original Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input 
                  type="number" 
                  step="0.01"
                  min="0"
                  value={formData.originalPrice || ""}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/20 focus:border-wine outline-none transition-all"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div className="space-y-3 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Product Image *</label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition-all hover:bg-gray-50 bg-white cursor-pointer" onClick={() => !imagePreview && fileInputRef.current?.click()}>
                {!imagePreview ? (
                  <div className="space-y-4 flex flex-col items-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-wine/10 flex items-center justify-center text-wine">
                      <UploadCloud size={32} />
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">Click to upload image</p>
                      <p className="text-sm text-gray-500 mt-1">JPEG, PNG, WEBP (Max 8MB)</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative inline-block rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <Image 
                        src={imagePreview} 
                        alt="Preview" 
                        width={300} 
                        height={400} 
                        className="object-cover h-64 w-auto"
                        unoptimized={imagePreview.startsWith("blob:")}
                      />
                      <button 
                        type="button" 
                        onClick={(e) => { e.stopPropagation(); removeImage(); }}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                      >
                        <X size={16} />
                      </button>
                      {imageFile && (
                        <div className="absolute bottom-0 inset-x-0 bg-black/60 p-2">
                          <p className="text-xs text-white truncate px-2">{imageFile.name}</p>
                        </div>
                      )}
                    </div>
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                      className="text-sm text-wine hover:underline font-medium"
                    >
                      Change Image
                    </button>
                  </div>
                )}
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/jpeg, image/png, image/webp" 
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          <h2 className="text-xl font-serif text-wine font-semibold border-b border-gray-100 pb-4">Settings & Sorting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Sort Order</label>
              <input 
                type="number" 
                value={formData.sortOrder || 0}
                onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/20 focus:border-wine outline-none transition-all"
                placeholder="0"
              />
              <p className="text-xs text-gray-500">Higher numbers appear lower in lists.</p>
            </div>
            
            <div className="space-y-4 pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    checked={formData.isActive ?? true}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-wine/20 focus:outline-none checked:bg-green-600 checked:border-green-600 transition-colors"
                  />
                  <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Active</span>
                  <p className="text-xs text-gray-500">Visible to customers</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    checked={formData.isFeatured ?? false}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-wine/20 focus:outline-none checked:bg-amber-500 checked:border-amber-500 transition-colors"
                  />
                  <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Featured</span>
                  <p className="text-xs text-gray-500">Show in featured sections</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    checked={formData.isNewArrival ?? false}
                    onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                    className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-wine/20 focus:outline-none checked:bg-blue-600 checked:border-blue-600 transition-colors"
                  />
                  <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">New Arrival</span>
                  <p className="text-xs text-gray-500">Mark as new arrival</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="bg-wine text-white px-8 py-3 rounded-lg hover:bg-wine/90 disabled:opacity-50 flex items-center gap-2 font-medium transition-colors"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? "Saving..." : (initialData ? "Save Changes" : "Create Product")}
          </button>
        </div>
      </form>
    </div>
  );
}

