import Link from "next/link";
import { ChevronRight, Filter } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";
import FadeInView from "@/components/FadeInView";

export default async function CollectionsPage() {
  const allProducts = await getProducts();
  
  // Mock categories for the sidebar
  const categories = [
    "All Sarees",
    "Bridal Masterpieces",
    "Pure Kanchipuram",
    "Banarasi Heritage",
    "Soft Silk Elegance",
    "Designer Edition",
    "Festive Weaves"
  ];

  return (
    <div className="bg-background min-h-screen flex flex-col pt-24 md:pt-32">
      
      {/* 1. Page Header & Breadcrumb */}
      <div className="container mx-auto px-4 md:px-8 mb-8 md:mb-12">
        <FadeInView>
          <div className="flex items-center gap-2 text-wine-dark/60 text-[10px] tracking-widest uppercase font-medium mb-6">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-wine-dark font-bold">All Collections</span>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-wine-dark mb-4 drop-shadow-sm">The Curated Archive</h1>
              <p className="text-wine-dark/70 text-sm md:text-base max-w-xl font-light leading-relaxed">
                Explore our entire heritage collection. Each piece is handwoven by master artisans, preserving centuries of traditional craftsmanship.
              </p>
            </div>
            <div className="text-wine-dark/50 text-xs tracking-[0.2em] uppercase font-medium pb-2 border-b border-gold/30">
              {allProducts.length} Exclusive Pieces
            </div>
          </div>
        </FadeInView>
      </div>

      {/* 2. Main Layout (Sidebar + Grid) */}
      <div className="container mx-auto px-4 md:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-32 bg-background">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold/20">
                <Filter size={18} className="text-gold" />
                <h3 className="font-serif text-xl text-wine-dark">Refine By</h3>
              </div>
              
              <ul className="space-y-4 mb-10">
                {categories.map((category, idx) => (
                  <li key={category}>
                    <button className={`text-sm tracking-[0.1em] uppercase transition-colors text-left w-full ${idx === 0 ? "text-gold font-medium" : "text-wine-dark/70 hover:text-wine-dark"}`}>
                      {category}
                    </button>
                  </li>
                ))}
              </ul>

              <h3 className="font-serif text-lg text-wine-dark mb-6 pb-2 border-b border-gold/20">Price Range</h3>
              <div className="space-y-6">
                <div className="relative w-full h-1 bg-gold/20 rounded">
                  <div className="absolute top-0 left-0 h-1 bg-gold w-3/4 rounded" />
                  <div className="absolute -top-1.5 left-3/4 w-4 h-4 bg-wine-dark rounded-full shadow border border-gold" />
                </div>
                <div className="flex justify-between text-xs tracking-wider text-wine-dark/70 font-medium">
                  <span>$100</span>
                  <span>$1000+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid & Controls */}
          <div className="flex-1">
            
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-10 pb-4 border-b border-gold/10">
              <p className="text-xs tracking-widest uppercase text-wine-dark/60 hidden md:block">
                Displaying 1 - 12 of {allProducts.length}
              </p>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <span className="text-xs tracking-widest uppercase text-wine-dark/60">Sort By</span>
                <select className="bg-transparent border border-gold/30 rounded-none px-4 py-2 text-xs uppercase tracking-wider text-wine-dark focus:outline-none focus:border-gold cursor-pointer flex-1 md:flex-none">
                  <option>Featured Edition</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                </select>
              </div>
            </div>
            
            {/* Responsive Grid 4/3/2 */}
            {/* grid-cols-2 for mobile, grid-cols-3 for tablet, grid-cols-4 for large desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
              {allProducts.map((product, idx) => {
                return (
                  <FadeInView key={product.id} delay={(idx % 8) * 0.05}>
                    <ProductCard product={product} />
                  </FadeInView>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="mt-20 flex justify-center items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center border border-gold/30 hover:border-gold text-wine-dark transition-colors">
                <ChevronRight size={16} className="rotate-180" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-wine-dark text-gold border border-wine-dark">1</button>
              <button className="w-10 h-10 flex items-center justify-center border border-transparent hover:border-gold/30 text-wine-dark/70 hover:text-wine-dark transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center border border-transparent hover:border-gold/30 text-wine-dark/70 hover:text-wine-dark transition-colors">3</button>
              <span className="text-wine-dark/50 px-2">...</span>
              <button className="w-10 h-10 flex items-center justify-center border border-transparent hover:border-gold/30 text-wine-dark/70 hover:text-wine-dark transition-colors">12</button>
              <button className="w-10 h-10 flex items-center justify-center border border-gold/30 hover:border-gold text-wine-dark transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
