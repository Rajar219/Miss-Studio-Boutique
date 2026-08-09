import Link from "next/link";
import { LayoutDashboard, Library, ShoppingBag, Image as ImageIcon, Settings, LogOut, Menu } from "lucide-react";
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
      <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden md:flex min-h-screen sticky top-0">
        <div className="p-6 border-b border-gray-200">
          <h1 className="font-serif text-2xl text-wine font-bold">Miss Studio</h1>
          <p className="text-sm text-gray-500 mt-1">Admin Dashboard</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-wine/5 hover:text-wine transition-colors group">
            <LayoutDashboard size={20} className="text-gray-400 group-hover:text-wine transition-colors" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/collections" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-wine/5 hover:text-wine transition-colors group">
            <Library size={20} className="text-gray-400 group-hover:text-wine transition-colors" />
            <span className="font-medium">Collections</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-wine/5 hover:text-wine transition-colors group">
            <ShoppingBag size={20} className="text-gray-400 group-hover:text-wine transition-colors" />
            <span className="font-medium">Products</span>
          </Link>
          <Link href="/admin/banner" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-wine/5 hover:text-wine transition-colors group">
            <ImageIcon size={20} className="text-gray-400 group-hover:text-wine transition-colors" />
            <span className="font-medium">Banner</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-wine/5 hover:text-wine transition-colors group">
            <Settings size={20} className="text-gray-400 group-hover:text-wine transition-colors" />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
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
