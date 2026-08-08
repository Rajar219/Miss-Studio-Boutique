"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Collection, saveCollection } from "@/lib/collections";
import { UploadCloud, ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ImageUploader from "@/components/admin/ImageUploader";

export default function CollectionForm({ initialData }: { initialData?: Collection }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Collection>>(
    initialData || {
      name: "",
      slug: "",
      description: "",
      featured: true,
      coverImage: "",
    }
  );

  const [previewImage, setPreviewImage] = useState(initialData?.coverImage || "");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview
    setPreviewImage(URL.createObjectURL(file));

    // Upload to server
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      
      if (res.ok) {
        setFormData({ ...formData, coverImage: result.url });
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload image.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.coverImage) {
      alert("Please upload a cover image.");
      setLoading(false);
      return;
    }

    const res = await saveCollection(formData as Collection);
    if (res.success) {
      router.push("/admin/collections");
      router.refresh();
    } else {
      alert(res.error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/collections" className="p-2 text-gray-500 hover:text-wine hover:bg-wine/5 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-serif text-wine font-bold">
            {initialData ? "Edit Collection" : "Add Collection"}
          </h1>
          <p className="text-gray-500 mt-1">
            {initialData ? "Update the collection details below." : "Create a new collection for your store."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
        
        {/* Cover Image Upload */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Cover Image</label>
          <ImageUploader 
            folder="collections" 
            value={formData.coverImage || ""} 
            onChange={(url) => setFormData({ ...formData, coverImage: url as string })} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Collection Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => {
                const name = e.target.value;
                setFormData({ 
                  ...formData, 
                  name, 
                  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') 
                });
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/20 focus:border-wine outline-none transition-all"
              placeholder="e.g. Bridal Wear"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">URL Slug</label>
            <input 
              type="text" 
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/20 focus:border-wine outline-none transition-all bg-gray-50"
              placeholder="e.g. bridal-wear"
            />
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
            placeholder="Describe this collection..."
          />
        </div>

        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
          <input 
            type="checkbox" 
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-wine focus:ring-wine"
          />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700 cursor-pointer">
            Visible on Website
            <span className="block text-xs text-gray-500 font-normal">If unchecked, this collection will be hidden from the store.</span>
          </label>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
          <Link 
            href="/admin/collections"
            className="px-6 py-3 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors"
          >
            Cancel
          </Link>
          <button 
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-lg bg-wine text-white font-medium hover:bg-wine/90 transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {initialData ? "Save Changes" : "Create Collection"}
          </button>
        </div>
      </form>
    </div>
  );
}
