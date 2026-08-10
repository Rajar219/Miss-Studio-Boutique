"use client";

import type { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ 
  product, 
  isOutOfStock, 
  className 
}: { 
  product: Product, 
  isOutOfStock: boolean,
  className?: string
}) {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;
    addToCart(product);
  };

  return (
    <button 
      disabled={isOutOfStock}
      onClick={handleAdd}
      className={`flex-1 bg-wine hover:bg-wine/90 disabled:bg-foreground/20 disabled:cursor-not-allowed text-white py-4 px-8 rounded-full font-medium transition-colors shadow-lg shadow-wine/20 disabled:shadow-none text-lg ${className || ""}`}
    >
      {isOutOfStock ? "Out of Stock" : "Add to Cart"}
    </button>
  );
}
