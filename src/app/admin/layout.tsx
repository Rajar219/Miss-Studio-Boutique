import Link from "next/link";
import { LayoutDashboard, Library, ShoppingBag, Image as ImageIcon, Settings, LogOut, Menu, Tags, ShoppingCart, Users, Archive, Home, MessageSquareQuote } from "lucide-react";
import { ReactNode } from "react";
import SignOutButton from "@/components/admin/SignOutButton";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h1 className="font-serif text-xl text-wine font-bold">Miss Studio Admin</h1>
        <button className="text-gray-500 hover:text-wine transition-colors">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden md:flex h-screen sticky top-0 overflow-y-auto custom-scrollbar">
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h1 className="font-serif text-2xl text-wine font-bold">Miss Studio</h1>
          <p className="text-sm text-gray-500 mt-1">Admin Dashboard</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4 px-4">Overview</div>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-wine/5 hover:text-wine transition-colors group">
            <LayoutDashboard size={18} className="text-gray-400 group-hover:text-wine transition-colors" />
            <span className="font-medium text-sm">Dashboard</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-wine/5 hover:text-wine transition-colors group">
            <ShoppingCart size={18} className="text-gray-400 group-hover:text-wine transition-colors" />
            <span className="font-medium text-sm">Orders</span>
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-wine/5 hover:text-wine transition-colors group">
            <Users size={18} className="text-gray-400 group-hover:text-wine transition-colors" />
            <span className="font-medium text-sm">Customers</span>
          </Link>

          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6 px-4">Catalog</div>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-wine/5 hover:text-wine transition-colors group">
            <ShoppingBag size={18} className="text-gray-400 group-hover:text-wine transition-colors" />
            <span className="font-medium text-sm">Products</span>
          </Link>
          <Link href="/admin/inventory" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-wine/5 hover:text-wine transition-colors group">
            <Archive size={18} className="text-gray-400 group-hover:text-wine transition-colors" />
            <span className="font-medium text-sm">Inventory</span>
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-wine/5 hover:text-wine transition-colors group">
            <Tags size={18} className="text-gray-400 group-hover:text-wine transition-colors" />
            <span className="font-medium text-sm">Categories</span>
          </Link>
          <Link href="/admin/collections" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-wine/5 hover:text-wine transition-colors group">
            <Library size={18} className="text-gray-400 group-hover:text-wine transition-colors" />
            <span className="font-medium text-sm">Collections</span>
          </Link>

          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6 px-4">Content</div>
          <Link href="/admin/homepage" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-wine/5 hover:text-wine transition-colors group">
            <Home size={18} className="text-gray-400 group-hover:text-wine transition-colors" />
            <span className="font-medium text-sm">Homepage</span>
          </Link>
          <Link href="/admin/banner" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-wine/5 hover:text-wine transition-colors group">
            <ImageIcon size={18} className="text-gray-400 group-hover:text-wine transition-colors" />
            <span className="font-medium text-sm">Banners</span>
          </Link>
          <Link href="/admin/testimonials" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-wine/5 hover:text-wine transition-colors group">
            <MessageSquareQuote size={18} className="text-gray-400 group-hover:text-wine transition-colors" />
            <span className="font-medium text-sm">Testimonials</span>
          </Link>

          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6 px-4">System</div>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-wine/5 hover:text-wine transition-colors group">
            <Settings size={18} className="text-gray-400 group-hover:text-wine transition-colors" />
            <span className="font-medium text-sm">Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white">
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
