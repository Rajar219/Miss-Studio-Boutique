import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";
import { getCollections } from "@/lib/collections";
import HeroCarousel from "@/components/HeroCarousel";
import FadeInView from "@/components/FadeInView";
import { siteConfig } from "@/config/site";

// Reviews removed from production as requested by user.
// TODO: Fetch real testimonials from DB.

export default async function Home() {
  const allProducts = await getProducts();
  const collections = await getCollections();
  
  const featuredProducts = allProducts.filter((p) => p.featured).slice(0, 4); 
  const bestSellers = allProducts.filter((p) => p.trending).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      {/* 1. Immersive Hero Section */}
      <HeroCarousel />

      {/* 2. Shop by Category */}
      <section className="py-24 md:py-32 bg-background relative border-b border-gold/20 overflow-hidden">
        <FadeInView className="container mx-auto px-4 md:px-8">
          
          <div className="flex items-center justify-center gap-6 mb-16">
            <div className="h-px w-16 bg-gold/50 relative">
              <div className="absolute -left-1 -top-1 w-2 h-2 rotate-45 border border-gold/50 bg-background" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-wine-dark tracking-[0.15em] uppercase">Shop by Category</h2>
            <div className="h-px w-16 bg-gold/50 relative">
              <div className="absolute -right-1 -top-1 w-2 h-2 rotate-45 border border-gold/50 bg-background" />
            </div>
          </div>
          
          <div className="flex overflow-x-auto pb-8 gap-8 md:gap-14 justify-start md:justify-center scrollbar-hide">
            {collections.map((collection) => (
              <Link 
                key={collection.id} 
                href={`/collections/${collection.slug}`}
                className="flex flex-col items-center gap-6 group shrink-0"
              >
                <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border border-gold/30 p-2 transition-all duration-700 group-hover:scale-105 group-hover:border-gold">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={collection.coverImage}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-[2000ms] group-hover:scale-125"
                    />
                    <div className="absolute inset-0 bg-wine-dark/10 group-hover:bg-transparent transition-colors duration-700" />
                  </div>
                </div>
                <span className="font-medium text-xs text-wine-dark tracking-[0.2em] transition-colors uppercase">
                  {collection.name}
                </span>
              </Link>
            ))}
          </div>
        </FadeInView>
      </section>

      {/* 3. Featured Collections */}
      <section className="py-24 md:py-32 bg-wine-dark overflow-hidden">
        <FadeInView className="container mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-gold" />
                <span className="text-gold tracking-[0.3em] uppercase text-[10px] font-medium">Curated Selection</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white tracking-wide mb-4">Featured Collections</h2>
              <p className="text-white/60 font-light leading-relaxed">Discover our most exquisite pieces, handwoven with precision and love for your most cherished moments.</p>
            </div>

            <Link 
              href="/collections"
              className="text-gold text-xs tracking-[0.2em] uppercase font-medium border border-gold/30 px-8 py-4 hover:bg-gold hover:text-wine-dark transition-colors flex items-center gap-2 shrink-0"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {featuredProducts.map((product, index) => (
              <FadeInView key={product.id} delay={index * 0.1}>
                <ProductCard product={product} priority={index < 2} />
              </FadeInView>
            ))}
          </div>
        </FadeInView>
      </section>

      {/* 4. Premium Collection Banner */}
      <section className="bg-background relative">
        <div className="flex flex-col md:flex-row h-auto md:h-[80vh] min-h-[600px]">
          <div className="w-full md:w-1/2 relative h-[50vh] md:h-full">
            <Image
              src="/assests/IMG-20260807-WA0054.jpg"
              alt="Premium Silk Saree"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-24 bg-background">
            <FadeInView className="max-w-lg text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <div className="h-px w-12 bg-gold/60" />
                <span className="text-wine tracking-[0.3em] uppercase text-xs font-medium">The Royal Edit</span>
                <div className="h-px w-12 bg-gold/60 md:hidden" />
              </div>
              <h2 className="font-serif text-4xl md:text-6xl text-wine-dark leading-tight mb-8">Elegance<br/>Redefined.</h2>
              <p className="text-wine-dark/70 font-light leading-relaxed mb-10 text-lg">
                Step into a world of unparalleled luxury with our new Royal Edit. Each saree is a masterpiece, taking months to weave by master artisans.
              </p>
              <Link 
                href="/collections?category=BRIDAL%20SAREES"
                className="inline-block bg-wine-dark text-gold hover:bg-gold hover:text-wine-dark transition-colors duration-300 px-10 py-4 font-medium text-xs tracking-[0.2em] uppercase"
              >
                Shop The Edit
              </Link>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* 5. Best Sellers */}
      <section className="py-24 md:py-32 bg-background overflow-hidden border-t border-gold/10">
        <FadeInView className="container mx-auto px-4 md:px-8">
          
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-gold" />
              <span className="text-wine tracking-[0.3em] uppercase text-[10px] font-medium">Most Loved</span>
              <div className="h-px w-10 bg-gold" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-wine-dark tracking-wide">Best Sellers</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {bestSellers.map((product, index) => (
              <FadeInView key={product.id} delay={index * 0.1}>
                <ProductCard product={product} />
              </FadeInView>
            ))}
          </div>
        </FadeInView>
      </section>

      {/* 6. Customer Reviews Placeholder */}
      <section className="py-24 md:py-32 bg-wine-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <FadeInView className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-5xl text-gold mb-8">Words of Love</h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Discover what our real customers have to say. Check our Instagram or visit our boutique to hear their stories.
          </p>
        </FadeInView>
      </section>

      {/* 7. Instagram Gallery */}
      <section className="py-24 bg-background">
        <FadeInView className="container mx-auto px-4 md:px-8 text-center">
          <div className="flex justify-center items-center gap-2 text-wine mb-4">
            <span className="text-xs tracking-[0.2em] uppercase font-medium">@missstudio</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-wine-dark mb-12">Follow Our Journey</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {collections.slice(0, 4).map((col) => (
              <Link href={`/collections/${col.slug}`} key={col.id} className="relative aspect-square group overflow-hidden bg-background/5">
                <Image
                  src={col.coverImage}
                  alt={col.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-wine-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white text-xs tracking-[0.2em] uppercase font-medium">View Collection</span>
                </div>
              </Link>
            ))}
          </div>
        </FadeInView>
      </section>

      {/* 8. WhatsApp CTA */}
      <section className="py-16 bg-gold">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-2xl md:text-3xl text-wine-dark mb-2">Need Personalized Assistance?</h2>
            <p className="text-wine-dark/80 text-sm md:text-base">Our stylists are available on WhatsApp to help you choose the perfect saree.</p>
          </div>
          <a 
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-wine-dark text-gold px-8 py-4 uppercase text-xs tracking-[0.15em] font-medium hover:bg-white hover:text-wine-dark transition-colors shrink-0"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
            Chat with a Stylist
          </a>
        </div>
      </section>
    </div>
  );
}
