import { ShoppingBag, Library, Star, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
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
            <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
              +12% <ArrowUpRight size={14} />
            </span>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">124</p>
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
            <p className="text-3xl font-bold text-gray-900 mt-1">8</p>
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
            <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
          </div>
          <Link href="/admin/products?filter=featured" className="mt-4 text-sm text-wine font-medium hover:underline inline-flex items-center gap-1">
            Update featured
          </Link>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-serif font-bold text-wine mb-4">Recent Activity</h2>
        <div className="text-center py-12 text-gray-400">
          <p>No recent activity to show.</p>
        </div>
      </div>
    </div>
  );
}
