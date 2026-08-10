import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, Heart, Share2, Ruler, Truck, RotateCcw, ShieldCheck, MessageCircle } from "lucide-react";
import { getPublicProductById, getPublicRelatedProducts } from "@/lib/db-products";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  const product = await getPublicProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const title = `${product.name} | Premium ${product.sareeType || 'Sarees'}`;
  const description = product.description || `Buy the elegant ${product.name} at Miss Studio. Premium craftsmanship and luxurious fabrics for your special occasions.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/product/${id}`,
    },
  };
}

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const product = await getPublicProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getPublicRelatedProducts(product.collection, product.id);
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;
  
  const discountPercentage = product.offerPrice 
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;
    
  const price = product.offerPrice || product.price;
  const productUrl = `${siteConfig.url}/product/${product.id}`;
  
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    category: product.category || product.sareeType,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: price,
      itemCondition: "https://schema.org/NewCondition",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: productUrl,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Collections",
        item: `${siteConfig.url}/collections`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.collection,
        item: `${siteConfig.url}/collections`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  const whatsappMessage = encodeURIComponent(
`Hello ${siteConfig.name},
I am interested in this saree.

Product: ${product.name}
SKU: ${product.sku}
Price: Rs. ${price}

Product Link: ${productUrl}`
  );
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-8 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <Link href="/collections" className="inline-flex items-center gap-2 text-wine hover:text-gold transition-colors font-medium text-sm tracking-wide uppercase">
            <ArrowLeft size={16} /> Back to Collection
          </Link>
          
          <div className="flex items-center gap-2 text-xs text-foreground/60 overflow-x-auto whitespace-nowrap tracking-wider uppercase">
            <Link href="/" className="hover:text-wine transition-colors shrink-0">Home</Link>
            <span className="shrink-0 text-gold">•</span>
            <Link href="/collections" className="hover:text-wine transition-colors shrink-0">Collections</Link>
            {product.category && (
              <>
                <span className="shrink-0 text-gold">•</span>
                <Link href={`/collections?category=${product.category}`} className="hover:text-wine transition-colors shrink-0">{product.category}</Link>
              </>
            )}
            <span className="shrink-0 text-gold">•</span>
            <span className="text-foreground truncate">{product.name}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 mb-24">
          
          {/* LEFT: Image Gallery */}
          <div className="w-full lg:w-1/2">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* RIGHT: Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start">
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.newArrival && (
                <span className="bg-wine text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-sm">New</span>
              )}
              {discountPercentage > 0 && (
                <span className="bg-gold text-wine-dark text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-sm">Sale {discountPercentage}% Off</span>
              )}
            </div>

            <p className="text-wine uppercase tracking-[0.2em] text-xs font-semibold mb-2">{product.collection}</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-3 leading-tight">{product.name}</h1>
            
            <p className="text-foreground/50 text-xs tracking-[0.1em] mb-6 uppercase">SKU: {product.sku}</p>
            
            {/* Pricing & Rating */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-gold/20 pb-6 mb-8 gap-4">
              <div className="flex items-baseline gap-4">
                {product.offerPrice ? (
                  <>
                    <p className="text-3xl font-medium text-foreground">Rs. {product.offerPrice.toLocaleString()}</p>
                    <p className="text-lg text-foreground/40 line-through decoration-wine/30">Rs. {product.price.toLocaleString()}</p>
                  </>
                ) : (
                  <p className="text-3xl font-medium text-foreground">Rs. {product.price.toLocaleString()}</p>
                )}
              </div>
              
              <div className="flex items-center text-gold">
                <div className="flex">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <span className="text-foreground/50 text-xs ml-2 tracking-widest uppercase">12 Reviews</span>
              </div>
            </div>

            <p className="text-foreground/80 leading-relaxed mb-10 text-base md:text-lg font-light">
              {product.description}
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-4 mb-12">
              {isOutOfStock ? (
                <div className="bg-red-50 text-red-600 border border-red-100 px-4 py-3 rounded-md text-sm font-medium tracking-wide">
                  Currently Out of Stock. Contact us to know when it returns.
                </div>
              ) : isLowStock ? (
                <div className="text-orange-500 text-sm font-medium tracking-wide flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                  Hurry! Only {product.stock} pieces left in stock.
                </div>
              ) : null}
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <AddToCartButton product={product} isOutOfStock={isOutOfStock} />
                </div>
                
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-wine text-wine hover:bg-wine hover:text-white transition-colors px-6 py-4 rounded-none font-medium text-xs tracking-[0.2em] uppercase"
                >
                  <MessageCircle size={18} /> Enquire
                </a>
              </div>
              
              <div className="flex gap-4 mt-2 justify-center sm:justify-start">
                <button className="flex items-center gap-2 text-foreground/60 hover:text-wine transition-colors text-xs tracking-wider uppercase font-medium">
                  <Heart size={16} /> Add to Wishlist
                </button>
                <span className="text-gold/50">|</span>
                <button className="flex items-center gap-2 text-foreground/60 hover:text-wine transition-colors text-xs tracking-wider uppercase font-medium">
                  <Share2 size={16} /> Share
                </button>
              </div>
            </div>

            {/* Details & Features Grid */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gold/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <h2 className="font-serif text-2xl text-wine mb-6 border-b border-gold/10 pb-4">Product Details</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-medium text-foreground/60 tracking-wide uppercase text-xs">Fabric</span>
                  <span className="text-foreground">{product.fabric}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-medium text-foreground/60 tracking-wide uppercase text-xs">Color</span>
                  <span className="text-foreground">{product.color}</span>
                </div>
                {product.sareeType && (
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="font-medium text-foreground/60 tracking-wide uppercase text-xs">Saree Type</span>
                    <span className="text-foreground">{product.sareeType}</span>
                  </div>
                )}
                {product.occasion && (
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="font-medium text-foreground/60 tracking-wide uppercase text-xs">Occasion</span>
                    <span className="text-foreground">{product.occasion}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6 text-xs text-foreground/70">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-gold/5 flex items-center justify-center text-wine mb-1">
                    <Ruler size={20} />
                  </div>
                  <span className="font-medium text-foreground uppercase tracking-wider">Custom Tailoring</span>
                  <span className="text-foreground/50">Available for blouse</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-gold/5 flex items-center justify-center text-wine mb-1">
                    <Truck size={20} />
                  </div>
                  <span className="font-medium text-foreground uppercase tracking-wider">Global Shipping</span>
                  <span className="text-foreground/50">Free over Rs. 2000</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-gold/5 flex items-center justify-center text-wine mb-1">
                    <RotateCcw size={20} />
                  </div>
                  <span className="font-medium text-foreground uppercase tracking-wider">14-Day Returns</span>
                  <span className="text-foreground/50">Hassle-free process</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-gold/5 flex items-center justify-center text-wine mb-1">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="font-medium text-foreground uppercase tracking-wider">100% Authentic</span>
                  <span className="text-foreground/50">Genuine weaves</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gold/20 pt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif text-wine mb-4">You May Also Like</h2>
              <div className="w-12 h-1 bg-gold mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
