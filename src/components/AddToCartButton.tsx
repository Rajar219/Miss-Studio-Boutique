"use client";

import type { Product } from "@/lib/products";
import { siteConfig } from "@/config/site";

export default function AddToCartButton({ 
  product, 
  isOutOfStock, 
  className 
}: { 
  product: Product, 
  isOutOfStock: boolean,
  className?: string
}) {
  const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;
    
    const price = product.offerPrice || product.price;
    const imageUrl = product.images?.[0] || "";
    const productUrl = `${window.location.origin}/product/${product.id}`;
    
    const whatsappMessage = encodeURIComponent(
`Hello ${siteConfig.name},
I would like to buy this product:

Product: ${product.name}
SKU: ${product.sku}
Price: Rs. ${price}
Image: ${imageUrl}
Link: ${productUrl}`
    );
    
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button 
      disabled={isOutOfStock}
      onClick={handleBuy}
      className={`flex-1 bg-wine hover:bg-wine/90 disabled:bg-foreground/20 disabled:cursor-not-allowed text-white py-4 px-8 rounded-full font-medium transition-colors shadow-lg shadow-wine/20 disabled:shadow-none text-lg ${className || ""}`}
    >
      {isOutOfStock ? "Out of Stock" : "Buy Now"}
    </button>
  );
}
