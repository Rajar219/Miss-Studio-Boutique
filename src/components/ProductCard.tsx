import Image from "next/image";
import Link from "next/link";
import { Heart, Eye } from "lucide-react";
import type { Product } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;
  const hasOffer = !!product.offerPrice;

  return (
    <div className="group relative rounded-none overflow-hidden transition-all duration-700 flex flex-col h-full bg-background border border-transparent hover:border-gold/30 hover:shadow-2xl hover:shadow-wine/5">
      
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-background shrink-0 w-full">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-[1000ms] group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              className="object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100 absolute inset-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          )}
          
          {/* Subtle dark gradient overlay on hover for better button visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
        
        {/* Wishlist Button */}
        <button aria-label="Add to Wishlist" className="absolute top-4 right-4 w-9 h-9 bg-background/90 hover:bg-gold hover:text-wine-dark rounded-full flex items-center justify-center text-wine shadow-sm transition-all duration-300 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 z-10">
          <Heart size={16} strokeWidth={2} />
        </button>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.newArrival && (
            <span className="bg-wine-dark text-gold text-[10px] uppercase font-semibold tracking-[0.2em] py-1.5 px-3 rounded-none shadow-sm border border-gold/20">
              New
            </span>
          )}
          {product.trending && (
            <span className="bg-[#4A0A23] text-[#FDE08B] text-[10px] uppercase font-semibold tracking-[0.2em] py-1.5 px-3 rounded-none shadow-sm border border-[#D4AF37]/40">
              Trending
            </span>
          )}
          {hasOffer && (
            <span className="bg-gold text-wine-dark text-[10px] uppercase font-semibold tracking-[0.2em] py-1.5 px-3 rounded-none shadow-sm">
              Sale
            </span>
          )}
        </div>

        {/* Quick View Button (Hover) */}
        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background/95 text-wine-dark hover:bg-gold hover:text-wine-dark border border-gold/30 text-xs tracking-[0.2em] uppercase font-medium py-3 px-6 rounded-none flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-105 z-10 shadow-lg">
          <Eye size={14} /> Quick View
        </button>
      </div>
      
      {/* Product Info */}
      <div className="p-6 flex flex-col flex-1 text-center bg-background">
        <p className="text-[10px] uppercase tracking-[0.2em] mb-2 font-medium text-wine/60">{product.collection}</p>
        
        <Link href={`/product/${product.id}`} className="mb-3 block">
          <h3 className="font-serif text-xl transition-colors line-clamp-1 text-wine-dark group-hover:text-gold">
            {product.name}
          </h3>
        </Link>

        <div className="flex justify-center items-center gap-3 mt-auto">
          {hasOffer ? (
            <>
              <p className="text-sm line-through text-wine-dark/40 font-light">Rs. {product.price}</p>
              <p className="font-serif font-medium text-lg text-wine-dark">Rs. {product.offerPrice}</p>
            </>
          ) : (
            <p className="font-serif font-medium text-lg text-wine-dark">Rs. {product.price}</p>
          )}
        </div>

        {/* Stock status or Add to Cart on hover replacement (Mobile friendly layout below) */}
        <div className="mt-5 relative h-10 overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-center items-center transition-transform duration-500 group-hover:-translate-y-full">
            {isOutOfStock ? (
              <span className="text-[10px] text-red-500/80 font-medium uppercase tracking-wider">Out of Stock</span>
            ) : isLowStock ? (
              <span className="text-[10px] text-orange-500/80 font-medium uppercase tracking-wider">Only {product.stock} Left</span>
            ) : (
              <span className="w-8 h-px bg-gold/30" />
            )}
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center transition-transform duration-500 translate-y-full group-hover:translate-y-0">
             <AddToCartButton 
              product={product} 
              isOutOfStock={isOutOfStock} 
              className="w-full h-full !py-0 text-[11px] uppercase tracking-[0.15em] bg-wine-dark hover:bg-gold hover:text-wine-dark text-white rounded-none flex items-center justify-center gap-2 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
