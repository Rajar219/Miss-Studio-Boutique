"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Suspense } from "react";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import FadeInView from "@/components/FadeInView";
import { siteConfig } from "@/config/site";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { clearCart } = useCart();
  const router = useRouter();

  const [hasCleared, setHasCleared] = useState(false);

  useEffect(() => {
    if (!orderId) {
      router.push("/");
    } else if (!hasCleared) {
      clearCart();
      setHasCleared(true);
    }
  }, [orderId, clearCart, router, hasCleared]);

  if (!orderId) return null;

  const handleWhatsApp = () => {
    const phoneNumber = siteConfig.whatsappNumber;
    const message = `Hello Miss Studio team,\n\nI just placed an order on your website.\n*Order ID:* ${orderId}\n\nI would like to confirm my payment.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <FadeInView className="max-w-xl w-full bg-white p-10 md:p-14 rounded-3xl shadow-xl text-center border border-gold/20">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        
        <h1 className="font-serif text-4xl text-wine-dark mb-4">Order Received!</h1>
        <p className="text-wine-dark/70 text-lg mb-8 leading-relaxed">
          Thank you for choosing Miss Studio Boutique. Your order has been successfully reserved in our system.
        </p>

        <div className="bg-foreground/5 p-6 rounded-2xl border border-gold/10 mb-10">
          <p className="text-sm tracking-widest uppercase text-wine-dark/60 font-medium mb-2">Your Order ID</p>
          <p className="font-serif text-2xl text-wine font-semibold">{orderId}</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white py-4 rounded-xl font-medium transition-colors shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2 text-lg"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
            Confirm Payment via WhatsApp
          </button>
          
          <p className="text-sm text-wine-dark/60 font-light mt-4 mb-6">
            Our team needs payment confirmation via WhatsApp to dispatch your elegant pieces.
          </p>

          <Link href="/collections" className="inline-flex items-center gap-2 text-wine hover:text-gold transition-colors font-medium tracking-wide uppercase text-sm mt-4">
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </div>
    </FadeInView>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-32 px-4">
      <Suspense fallback={<Loader2 className="animate-spin text-wine-dark" size={32} />}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
