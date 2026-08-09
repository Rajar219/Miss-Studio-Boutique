"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  if (!isCartOpen) return null;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format WhatsApp Message
    const phoneNumber = "916382088191"; // WhatsApp number for orders
    let message = `*New Order - Miss Studio*\n\n`;
    
    message += `*Customer Details:*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Address: ${formData.address}\n\n`;
    
    message += `*Order Items:*\n`;
    cart.forEach((item, index) => {
      const price = item.product.offerPrice || item.product.price;
      message += `${index + 1}. ${item.product.name} (x${item.quantity}) - Rs. ${price * item.quantity}\n`;
    });
    
    message += `\n*Total:* Rs. ${cartTotal}`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-background shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out border-l border-gold/20">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold/20">
          <h2 className="font-serif text-2xl text-wine flex items-center gap-2">
            <ShoppingBag size={24} /> Your Cart
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gold/10 rounded-full transition-colors text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-foreground/50 space-y-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p>Your cart is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-wine hover:text-gold transition-colors underline underline-offset-4"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => {
                const price = item.product.offerPrice || item.product.price;
                return (
                  <div key={item.product.id} className="flex gap-4 p-4 rounded-xl border border-gold/10 bg-white shadow-sm">
                    {/* Item Image */}
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-foreground/5">
                      <Image 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-foreground line-clamp-1">{item.product.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-foreground/40 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <p className="text-sm text-foreground/60 mb-2">{item.product.fabric}</p>
                      
                      <div className="flex justify-between items-end mt-auto">
                        <p className="font-medium text-wine">Rs. {price}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 border border-gold/20 rounded-full px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="text-foreground/60 hover:text-wine transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="text-foreground/60 hover:text-wine transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer & Checkout Form */}
        {cart.length > 0 && (
          <div className="border-t border-gold/20 p-6 bg-foreground/5">
            <div className="flex justify-between items-center mb-6">
              <span className="text-foreground/80 font-medium">Subtotal</span>
              <span className="text-2xl font-serif text-wine">Rs. {cartTotal}</span>
            </div>
            
            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="space-y-3">
                <input 
                  required
                  type="text" 
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white border border-gold/30 rounded-lg px-4 py-2.5 focus:outline-none focus:border-wine transition-colors text-sm"
                />
                <input 
                  required
                  type="tel" 
                  placeholder="Phone Number" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white border border-gold/30 rounded-lg px-4 py-2.5 focus:outline-none focus:border-wine transition-colors text-sm"
                />
                <textarea 
                  required
                  rows={2}
                  placeholder="Delivery Address" 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full bg-white border border-gold/30 rounded-lg px-4 py-2.5 focus:outline-none focus:border-wine transition-colors resize-none text-sm"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white py-3.5 rounded-xl font-medium transition-colors shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2"
              >
                Checkout via WhatsApp
              </button>
              <p className="text-xs text-center text-foreground/50 mt-2">
                You will be redirected to WhatsApp to confirm your order.
              </p>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
