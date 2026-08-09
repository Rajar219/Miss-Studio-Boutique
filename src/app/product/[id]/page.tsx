import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, Heart, Share2, Ruler, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { getProductById, getRelatedProducts } from "@/lib/products";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.collection, product.id);
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  return (
    <div className="bg-background min-h-screen pt-8 pb-24">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-foreground/60 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-wine transition-colors shrink-0">Home</Link>
          <span className="shrink-0">/</span>
          <Link href="/collections" className="hover:text-wine transition-colors shrink-0">Collections</Link>
          <span className="shrink-0">/</span>
          <span className="text-foreground truncate">{product.name}</span>
        </div>

        <Link href="/collections" className="inline-flex items-center gap-2 text-wine mb-6 hover:text-gold transition-colors font-medium">
          <ArrowLeft size={20} /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
          {/* Interactive Image Gallery */}
          <ProductGallery images={product.images} name={product.name} />

          {/* Product Info */}
          <div className="flex flex-col">
            <p className="text-wine uppercase tracking-[0.2em] text-sm font-semibold mb-2">{product.collection}</p>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">{product.name}</h1>
            
            <div className="flex items-end gap-4 mb-6">
              <div className="flex items-baseline gap-3">
                {product.offerPrice ? (
                  <>
                    <p className="text-3xl font-medium text-foreground">Rs. {product.offerPrice}</p>
                    <p className="text-lg text-foreground/40 line-through">Rs. {product.price}</p>
                  </>
                ) : (
                  <p className="text-3xl font-medium text-foreground">Rs. {product.price}</p>
                )}
              </div>
              
              <div className="flex items-center text-gold pb-1 ml-4 border-l border-gold/30 pl-4">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <span className="text-foreground/50 text-sm ml-2">(12)</span>
              </div>
            </div>

            <p className="text-foreground/80 leading-relaxed mb-8 text-lg">
              {product.description}
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-3 mb-10">
              {isOutOfStock && <p className="text-red-500 font-medium">Currently out of stock.</p>}
              {isLowStock && <p className="text-orange-500 font-medium">Hurry! Only {product.stock} left in stock.</p>}
              
              <div className="flex gap-4">
                <AddToCartButton product={product} isOutOfStock={isOutOfStock} />
                <button className="w-14 h-14 rounded-full border border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-white transition-colors shrink-0">
                  <Heart size={20} />
                </button>
                <button className="w-14 h-14 rounded-full border border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-white transition-colors shrink-0">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Details & Features */}
            <div className="border-t border-gold/20 pt-8">
              <h3 className="font-serif text-2xl text-wine mb-6">Product Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8 text-foreground/80">
                <div className="flex justify-between border-b border-gold/10 pb-2">
                  <span className="font-medium">Fabric</span>
                  <span>{product.fabric}</span>
                </div>
                <div className="flex justify-between border-b border-gold/10 pb-2">
                  <span className="font-medium">Color</span>
                  <span>{product.color}</span>
                </div>
              </div>

              <h4 className="font-medium text-foreground mb-3">Care Instructions</h4>
              <ul className="space-y-2 mb-10">
                {["Dry clean only", "Store in a cool, dry place", "Avoid direct sunlight"].map((instruction: string, idx: number) => (
                  <li key={idx} className="flex gap-3 text-foreground/80 items-start">
                    <span className="text-gold mt-1 text-xs">◆</span> {instruction}
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 gap-6 text-sm text-foreground/70 bg-white p-6 rounded-2xl border border-gold/10 shadow-sm">
                <div className="flex flex-col gap-2">
                  <Ruler className="text-wine" size={24} />
                  <span className="font-medium text-foreground">Custom Tailoring</span>
                  <span className="text-xs">Available for blouse</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Truck className="text-wine" size={24} />
                  <span className="font-medium text-foreground">Global Shipping</span>
                  <span className="text-xs">Free over Rs. 2000</span>
                </div>
                <div className="flex flex-col gap-2">
                  <RotateCcw className="text-wine" size={24} />
                  <span className="font-medium text-foreground">14-Day Returns</span>
                  <span className="text-xs">Hassle-free process</span>
                </div>
                <div className="flex flex-col gap-2">
                  <ShieldCheck className="text-wine" size={24} />
                  <span className="font-medium text-foreground">Authenticity Guarantee</span>
                  <span className="text-xs">100% genuine weaves</span>
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
