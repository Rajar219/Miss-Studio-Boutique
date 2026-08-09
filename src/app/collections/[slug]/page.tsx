import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCollectionBySlug } from "@/lib/collections";
import { getProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import FadeInView from "@/components/FadeInView";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  // Fetch products matching this exact collection name
  let products = await getProducts(collection.name);
  if (products.length === 0) {
    // Fallback just in case
    products = await getProducts();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Collection Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={collection.coverImage}
            alt={collection.name}
            fill
            className="object-cover object-top md:object-[center_top]"
            priority
          />
          <div className="absolute inset-0 bg-wine-dark/60" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <FadeInView>
            <div className="flex items-center gap-2 text-gold/80 text-[10px] tracking-widest uppercase font-medium mb-6 justify-center">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link href="/collections" className="hover:text-gold transition-colors">Collections</Link>
              <ChevronRight size={12} />
              <span className="text-gold">{collection.name}</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl text-white tracking-wider mb-6 drop-shadow-lg uppercase">
              {collection.name}
            </h1>
            <p className="max-w-2xl text-white/90 text-sm md:text-base font-light leading-relaxed drop-shadow-md">
              {collection.description}
            </p>
          </FadeInView>
        </div>
      </section>

      {/* 2. Collection Products Grid */}
      <section className="py-24 md:py-32 bg-background relative border-t border-gold/10">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-serif text-2xl md:text-4xl text-wine-dark tracking-wide">
              {collection.name} Collection
            </h2>
            <p className="text-wine-dark/60 text-xs tracking-[0.2em] uppercase">
              {products.length} Products
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {products.map((product, index) => (
                <FadeInView key={product.id} delay={index * 0.05}>
                  <ProductCard product={product} priority={index < 4} />
                </FadeInView>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center border border-gold/20 bg-background/5 rounded-2xl">
              <h3 className="font-serif text-2xl text-wine-dark mb-4">No products found</h3>
              <p className="text-wine-dark/70">We are currently updating our {collection.name} collection. Please check back later.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
