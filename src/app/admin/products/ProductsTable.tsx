"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2, Plus, Star, Zap, Clock, CheckCircle2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { DbProduct, deleteDbProduct, toggleDbProductStatus } from "./actions";

export default function ProductsTable({ initialProducts }: { initialProducts: DbProduct[] }) {
  const [products, setProducts] = useState(initialProducts);
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setIsUpdating(id);
    const res = await deleteDbProduct(id);
    if (res.success) {
      setProducts(products.filter(p => p.id !== id));
      router.refresh();
    } else {
      alert(res.error);
    }
    setIsUpdating(null);
  };

  const handleToggle = async (id: string, field: "isActive" | "isFeatured" | "isNewArrival", currentValue: boolean) => {
    setIsUpdating(id + field);
    const res = await toggleDbProductStatus(id, field, currentValue);
    if (res.success) {
      setProducts(products.map(p => 
        p.id === id ? { ...p, [field]: !currentValue } : p
      ));
      router.refresh();
    } else {
      alert(res.error);
    }
    setIsUpdating(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif text-wine font-bold">Products</h1>
          <p className="text-gray-500 mt-1">Manage your store&apos;s products and inventory.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="bg-wine text-white px-4 py-2 rounded-lg hover:bg-wine/90 flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
        >
          <Plus size={20} />
          Add Product
        </Link>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-gray-500 text-sm">
                <th className="p-4 font-medium">Image</th>
                <th className="p-4 font-medium">Product Details</th>
                <th className="p-4 font-medium">Pricing</th>
                <th className="p-4 font-medium">Order</th>
                <th className="p-4 font-medium text-center">Status Toggles</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 w-24">
                    <div className="w-16 h-20 rounded-lg overflow-hidden relative bg-gray-100 border border-gray-200">
                      {prod.imageUrl ? (
                        <Image src={prod.imageUrl} alt={prod.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center p-2">No Image</div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-gray-900">{prod.name}</p>
                    <p className="text-sm text-gray-500 mt-1">Saree Type: {prod.sareeType || 'N/A'}</p>
                    <p className="text-sm text-gray-500">Collection: <span className="text-wine font-medium">{prod.collection}</span></p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-gray-900">Rs. {prod.price}</p>
                    {prod.originalPrice && <p className="text-sm text-gray-400 line-through">Rs. {prod.originalPrice}</p>}
                  </td>
                  <td className="p-4">
                    <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                      {prod.sortOrder}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-2 items-center">
                      <button 
                        disabled={isUpdating === prod.id + 'isActive'}
                        onClick={() => handleToggle(prod.id, 'isActive', prod.isActive || false)}
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-colors w-28 justify-center border disabled:opacity-50 ${
                          prod.isActive ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-600 border-red-200"
                        }`}
                      >
                        {prod.isActive ? <CheckCircle2 size={12} /> : <XCircle size={12} />} {prod.isActive ? 'Active' : 'Inactive'}
                      </button>
                      <button 
                        disabled={isUpdating === prod.id + 'isFeatured'}
                        onClick={() => handleToggle(prod.id, 'isFeatured', prod.isFeatured || false)}
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-colors w-28 justify-center border disabled:opacity-50 ${
                          prod.isFeatured ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <Star size={12} className={prod.isFeatured ? "fill-amber-500" : ""} /> Featured
                      </button>
                      <button 
                        disabled={isUpdating === prod.id + 'isNewArrival'}
                        onClick={() => handleToggle(prod.id, 'isNewArrival', prod.isNewArrival || false)}
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-colors w-28 justify-center border disabled:opacity-50 ${
                          prod.isNewArrival ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <Clock size={12} className={prod.isNewArrival ? "text-blue-500" : ""} /> New Arrival
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
                        disabled={isUpdating === prod.id}
                        onClick={() => handleDelete(prod.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
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
