import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getPublicNewArrivals } from "@/lib/db-products";
import ProductCard from "@/components/ProductCard";
import FadeInView from "@/components/FadeInView";

export default async function NewArrivalsPage() {
  // Fetch active products marked as new arrivals from Neon PostgreSQL
  const newArrivals = await getPublicNewArrivals();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Page Header */}
      <section className="bg-wine-dark pt-32 pb-16 md:pt-40 md:pb-24 px-4 text-center">
        <FadeInView>
          <div className="flex items-center gap-2 text-gold/80 text-[10px] tracking-widest uppercase font-medium mb-6 justify-center">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-gold">New Arrivals</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-white tracking-wider mb-4 drop-shadow-sm uppercase">
            New Arrivals
          </h1>
          <p className="max-w-xl mx-auto text-white/80 text-sm md:text-base font-light leading-relaxed">
            Discover our latest handcrafted sarees, featuring fresh designs and timeless elegance. Be the first to explore the newest additions to our collection.
          </p>
        </FadeInView>
      </section>

      {/* 2. Products Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="flex justify-between items-end mb-10 border-b border-gold/20 pb-4">
            <h2 className="font-serif text-2xl md:text-3xl text-wine-dark tracking-wide">
              Latest Collection
            </h2>
            <p className="text-wine-dark/60 text-xs tracking-[0.2em] uppercase">
              {newArrivals.length} Products
            </p>
          </div>

          {newArrivals.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {newArrivals.map((product, index) => (
                <FadeInView key={product.id} delay={index * 0.05}>
                  <ProductCard product={product} />
                </FadeInView>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center border border-gold/20 bg-background/5 rounded-2xl">
              <h3 className="font-serif text-2xl text-wine-dark mb-4">No products found</h3>
              <p className="text-wine-dark/70">Check back soon for our latest arrivals.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
