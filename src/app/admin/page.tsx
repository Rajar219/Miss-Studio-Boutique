import { ShoppingBag, Library, Star, ArrowUpRight, PackageOpen, AlertTriangle, CheckCircle2, TrendingUp, Users, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { getDbProducts } from "@/app/admin/products/actions";
import { getCollections } from "@/lib/collections";
import Image from "next/image";

export default async function AdminDashboardPage() {
  // Fetch ALL products for admin view
  const products = await getDbProducts();
  const collections = await getCollections();
  
  const activeProducts = products.filter(p => p.isActive).length;
  const draftProducts = products.filter(p => !p.isActive).length;
  const outOfStockCount = products.filter(p => (p.stock ?? 0) === 0).length;
  const lowStockCount = products.filter(p => (p.stock ?? 0) > 0 && (p.stock ?? 0) <= 3).length;
  const featuredCount = products.filter(p => p.isFeatured).length;
  
  // Real order data will be fetched here in the future
  const orders = {
    total: 0,
    pending: 0,
    completed: 0,
    recent: []
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
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Revenue (30d)</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">Rs. 0</p>
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
          
          {orders.recent.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {orders.recent.map((order: any) => (
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
          ) : (
            <div className="text-center py-12 text-gray-400 flex flex-col items-center">
              <PackageOpen size={48} className="mb-4 opacity-20" />
              <p>No orders received yet.</p>
            </div>
          )}
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
              {recentProducts.map((product) => {
                const stock = product.stock ?? 0;
                return (
                  <div key={product.id} className="py-4 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                        {product.imageUrl ? (
                          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No Img</div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.collection}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-wine">Rs. {product.originalPrice || product.price}</p>
                      <p className={`text-xs ${stock === 0 ? 'text-red-500' : stock <= 3 ? 'text-orange-500' : 'text-green-600'}`}>
                        {stock > 0 ? `${stock} in stock` : 'Out of stock'}
                      </p>
                    </div>
                  </div>
                );
              })}
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
