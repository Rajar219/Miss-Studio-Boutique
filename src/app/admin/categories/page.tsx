import { Tags } from "lucide-react";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-wine font-bold">Categories</h1>
          <p className="text-gray-500 mt-1">Manage your product categories and hierarchy.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <Tags size={48} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-medium text-gray-900 mb-2">Coming Soon</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          The categories management system is currently under development. Soon you will be able to organize your products into nested categories.
        </p>
      </div>
    </div>
  );
}
