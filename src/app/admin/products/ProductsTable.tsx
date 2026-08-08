"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2, Plus, Star, Zap, Clock } from "lucide-react";
import { Product, deleteProduct, toggleProductStatus } from "@/lib/products";
import { useRouter } from "next/navigation";

export default function ProductsTable({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const res = await deleteProduct(id);
    if (res.success) {
      setProducts(products.filter(p => p.id !== id));
      router.refresh();
    } else {
      alert(res.error);
    }
  };

  const handleToggle = async (id: string, field: 'featured' | 'trending' | 'newArrival') => {
    const res = await toggleProductStatus(id, field);
    if (res.success) {
      setProducts(products.map(p => 
        p.id === id ? { ...p, [field]: !p[field] } : p
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
          <h1 className="text-3xl font-serif text-wine font-bold">Products</h1>
          <p className="text-gray-500 mt-1">Manage your store&apos;s products and inventory.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="bg-wine text-white px-4 py-2 rounded-lg hover:bg-wine/90 flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Product
        </Link>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-gray-500 text-sm">
                <th className="p-4 font-medium">Image</th>
                <th className="p-4 font-medium">Product Details</th>
                <th className="p-4 font-medium">Pricing & Stock</th>
                <th className="p-4 font-medium text-center">Status Toggles</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 w-24">
                    <div className="w-16 h-20 rounded-lg overflow-hidden relative bg-gray-100 border border-gray-200">
                      {prod.images?.[0] ? (
                        <Image src={prod.images[0]} alt={prod.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center p-2">No Image</div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-gray-900">{prod.name}</p>
                    <p className="text-sm text-gray-500 mt-1">SKU: {prod.sku || 'N/A'}</p>
                    <p className="text-sm text-gray-500">Collection: <span className="text-wine font-medium">{prod.collection}</span></p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-gray-900">${prod.price}</p>
                    {prod.offerPrice && <p className="text-sm text-green-600 line-through">${prod.offerPrice}</p>}
                    <p className={`text-sm mt-1 font-medium ${prod.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                      {prod.stock > 0 ? `${prod.stock} in stock` : "Out of stock"}
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-2 items-center">
                      <button 
                        onClick={() => handleToggle(prod.id, 'featured')}
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-colors w-28 justify-center border ${
                          prod.featured ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <Star size={12} className={prod.featured ? "fill-amber-500" : ""} /> Featured
                      </button>
                      <button 
                        onClick={() => handleToggle(prod.id, 'trending')}
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-colors w-28 justify-center border ${
                          prod.trending ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <Zap size={12} className={prod.trending ? "fill-purple-500 text-purple-500" : ""} /> Trending
                      </button>
                      <button 
                        onClick={() => handleToggle(prod.id, 'newArrival')}
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-colors w-28 justify-center border ${
                          prod.newArrival ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <Clock size={12} /> New Arrival
                      </button>
                    </div>
                  </td>
                  <td className="p-4 text-right align-top pt-6">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/admin/products/${prod.id}`}
                        className="p-2 text-gray-400 hover:text-wine hover:bg-wine/5 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(prod.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No products found. Click "Add Product" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
