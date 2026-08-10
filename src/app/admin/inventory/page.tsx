import { Archive } from "lucide-react";

export default function AdminInventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-wine font-bold">Inventory</h1>
          <p className="text-gray-500 mt-1">Track and manage your stock levels.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <Archive size={48} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-medium text-gray-900 mb-2">Coming Soon</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          The advanced inventory management system is currently under development.
        </p>
      </div>
    </div>
  );
}
