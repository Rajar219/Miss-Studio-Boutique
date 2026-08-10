import { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
