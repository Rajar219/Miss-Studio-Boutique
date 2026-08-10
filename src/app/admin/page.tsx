import { ShoppingBag, Library, Star, ArrowUpRight, PackageOpen, AlertTriangle, CheckCircle2, TrendingUp, Users, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import { getCollections } from "@/lib/collections";
import Image from "next/image";

export default async function AdminDashboardPage() {
  // Fetch ALL products for admin view
  const products = await getProducts(undefined, true);
  const collections = await getCollections();
  
  const activeProducts = products.filter(p => p.status === 'active').length;
  const draftProducts = products.filter(p => p.status === 'draft').length;
  const outOfStockCount = products.filter(p => p.stock === 0 || p.status === 'out_of_stock').length;
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 3).length;
  const featuredCount = products.filter(p => p.featured).length;
  
  // Mocked Order Data
  const orders = {
    total: 124,
    pending: 12,
    completed: 108,
    recent: [
      { id: "ORD-1024", customer: "Priya Sharma", date: "Today, 10:30 AM", status: "Pending", total: "Rs. 1,240" },
      { id: "ORD-1023", customer: "Anjali Patel", date: "Yesterday, 4:15 PM", status: "Completed", total: "Rs. 3,450" },
      { id: "ORD-1022", customer: "Meera Reddy", date: "Aug 7, 2026", status: "Completed", total: "Rs. 890" },
      { id: "ORD-1021", customer: "Sarah Khan", date: "Aug 6, 2026", status: "Completed", total: "Rs. 5,600" },
    ]
  };
  
  const recentProducts = [...products].reverse().slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-wine font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, Admin. Here is what&apos;s happening with your store today.</p>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Products */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <ShoppingBag size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Active Products</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{activeProducts}</p>
            <p className="text-xs text-gray-500 mt-1">{draftProducts} in draft</p>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-wine/5 flex items-center justify-center text-wine">
              <ShoppingCart size={24} />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{orders.total}</p>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
              <AlertTriangle size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Out of Stock</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{outOfStockCount}</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUp size={24} />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+8%</span>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Revenue (30d)</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">Rs. 45k</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-serif font-bold text-wine">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-wine hover:underline flex items-center gap-1">
              View all <ArrowUpRight size={16} />
            </Link>
          </div>
          
          <div className="divide-y divide-gray-100">
            {orders.recent.map((order) => (
              <div key={order.id} className="py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.id} • {order.customer}</p>
                  <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{order.total}</p>
                  <p className={`text-xs mt-1 ${order.status === 'Completed' ? 'text-green-600' : 'text-orange-500'}`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-serif font-bold text-wine">Recently Added Products</h2>
            <Link href="/admin/products" className="text-sm text-wine hover:underline flex items-center gap-1">
              View all <ArrowUpRight size={16} />
            </Link>
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
                    <p className={`text-xs ${product.stock === 0 ? 'text-red-500' : product.stock <= 3 ? 'text-orange-500' : 'text-green-600'}`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </p>
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
    </div>
  );
}
