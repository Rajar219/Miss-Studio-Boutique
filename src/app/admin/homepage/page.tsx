import { Home } from "lucide-react";

export default function AdminHomepageContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-wine font-bold">Homepage Content</h1>
          <p className="text-gray-500 mt-1">Manage the layout and content of your storefront.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <Home size={48} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-medium text-gray-900 mb-2">Coming Soon</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          The homepage visual builder is currently under development.
        </p>
      </div>
    </div>
  );
}
