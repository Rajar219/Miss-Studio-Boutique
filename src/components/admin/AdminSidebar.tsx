"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Library, ShoppingBag, Image as ImageIcon, Settings, Menu, Tags, 
  ShoppingCart, Users, Archive, Home, MessageSquareQuote, X 
} from "lucide-react";
import SignOutButton from "@/components/admin/SignOutButton";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const isActive = (path: string) => pathname === path;

  const NavLink = ({ href, icon: Icon, label }: { href: string, icon: any, label: string }) => (
    <Link 
      href={href} 
      onClick={closeSidebar}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors group ${
        isActive(href) 
          ? "bg-wine/10 text-wine" 
          : "text-gray-700 hover:bg-wine/5 hover:text-wine"
      }`}
    >
      <Icon size={18} className={isActive(href) ? "text-wine" : "text-gray-400 group-hover:text-wine transition-colors"} />
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-40">
        <h1 className="font-serif text-xl text-wine font-bold">Miss Studio Admin</h1>
        <button onClick={toggleSidebar} className="text-gray-500 hover:text-wine transition-colors">
          <Menu size={24} />
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-[100dvh] w-64 bg-white border-r border-gray-200 flex flex-col z-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-6 border-b border-gray-200 bg-white flex justify-between items-center shrink-0">
          <div>
            <h1 className="font-serif text-2xl text-wine font-bold">Miss Studio</h1>
            <p className="text-sm text-gray-500 mt-1">Admin Dashboard</p>
          </div>
          <button onClick={closeSidebar} className="md:hidden text-gray-500 hover:text-wine">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4 px-4">Overview</div>
          <NavLink href="/admin" icon={LayoutDashboard} label="Dashboard" />
          <NavLink href="/admin/orders" icon={ShoppingCart} label="Orders" />
          <NavLink href="/admin/customers" icon={Users} label="Customers" />

          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6 px-4">Catalog</div>
          <NavLink href="/admin/products" icon={ShoppingBag} label="Products" />
          <NavLink href="/admin/inventory" icon={Archive} label="Inventory" />
          <NavLink href="/admin/categories" icon={Tags} label="Categories" />
          <NavLink href="/admin/collections" icon={Library} label="Collections" />

          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6 px-4">Content</div>
          <NavLink href="/admin/homepage" icon={Home} label="Homepage" />
          <NavLink href="/admin/banner" icon={ImageIcon} label="Banners" />
          <NavLink href="/admin/testimonials" icon={MessageSquareQuote} label="Testimonials" />

          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6 px-4">System</div>
          <NavLink href="/admin/settings" icon={Settings} label="Settings" />
        </nav>

        <div className="p-4 border-t border-gray-200 bg-white shrink-0">
          <SignOutButton />
        </div>
      </aside>
    </>
  );
}
