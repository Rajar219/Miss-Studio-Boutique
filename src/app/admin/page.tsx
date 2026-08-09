import { ShoppingBag, Library, Star, ArrowUpRight, PackageOpen } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import { getCollections } from "@/lib/collections";
import Image from "next/image";

export default async function AdminDashboardPage() {
  const products = await getProducts();
  const collections = await getCollections();
  
  const featuredCount = products.filter(p => p.featured).length;
  
  // Get 5 most recent products for activity
  const recentProducts = [...products].reverse().slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-wine font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, Admin. Here is what&apos;s happening with your store today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-wine/5 flex items-center justify-center text-wine">
              <ShoppingBag size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{products.length}</p>
          </div>
          <Link href="/admin/products" className="mt-4 text-sm text-wine font-medium hover:underline inline-flex items-center gap-1">
            View all products
          </Link>
        </div>

        {/* Collections Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
              <Library size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Active Collections</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{collections.length}</p>
          </div>
          <Link href="/admin/collections" className="mt-4 text-sm text-wine font-medium hover:underline inline-flex items-center gap-1">
            Manage collections
          </Link>
        </div>

        {/* Featured Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Star size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Featured Items</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{featuredCount}</p>
          </div>
          <Link href="/admin/products?filter=featured" className="mt-4 text-sm text-wine font-medium hover:underline inline-flex items-center gap-1">
            Update featured
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-serif font-bold text-wine">Recently Added Products</h2>
          <Link href="/admin/products" className="text-sm text-wine hover:underline">View all</Link>
        </div>
        
        {recentProducts.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {recentProducts.map((product) => (
              <div key={product.id} className="py-4 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.collection}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-wine">Rs. {product.offerPrice || product.price}</p>
                  <p className="text-xs text-green-600">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 flex flex-col items-center">
            <PackageOpen size={48} className="mb-4 opacity-20" />
            <p>No products added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
