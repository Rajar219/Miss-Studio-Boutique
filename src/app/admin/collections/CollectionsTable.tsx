"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2, Plus, Eye, EyeOff } from "lucide-react";
import { Collection, deleteCollection, toggleCollectionFeatured } from "@/lib/collections";
import { useRouter } from "next/navigation";

export default function CollectionsTable({ initialCollections }: { initialCollections: Collection[] }) {
  const [collections, setCollections] = useState(initialCollections);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this collection?")) return;
    const res = await deleteCollection(id);
    if (res.success) {
      setCollections(collections.filter(c => c.id !== id));
      router.refresh();
    } else {
      alert(res.error);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    const res = await toggleCollectionFeatured(id);
    if (res.success) {
      setCollections(collections.map(c => 
        c.id === id ? { ...c, featured: !c.featured } : c
      ));
      router.refresh();
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-wine font-bold">Collections</h1>
          <p className="text-gray-500 mt-1">Manage your store&apos;s product collections.</p>
        </div>
        <Link 
          href="/admin/collections/new" 
          className="bg-wine text-white px-4 py-2 rounded-lg hover:bg-wine/90 flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Collection
        </Link>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50 text-gray-500 text-sm">
              <th className="p-4 font-medium">Cover</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Slug</th>
              <th className="p-4 font-medium text-center">Visibility</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((col) => (
              <tr key={col.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="p-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden relative bg-gray-100">
                    <Image src={col.coverImage} alt={col.name} fill className="object-cover" />
                  </div>
                </td>
                <td className="p-4 font-medium text-gray-900">{col.name}</td>
                <td className="p-4 text-gray-500">{col.slug}</td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => handleToggleFeatured(col.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      col.featured ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {col.featured ? <><Eye size={14} /> Visible</> : <><EyeOff size={14} /> Hidden</>}
                  </button>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link 
                      href={`/admin/collections/${col.id}`}
                      className="p-2 text-gray-400 hover:text-wine hover:bg-wine/5 rounded-lg transition-colors"
                    >
                      <Edit size={18} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(col.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {collections.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No collections found. Click "Add Collection" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
