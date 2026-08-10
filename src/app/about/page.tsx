import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Our Story & Heritage",
  description: "Learn about Miss Studio's journey, our master artisans, and our dedication to preserving the centuries-old tradition of handwoven Indian sarees.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-wine mb-4">About Miss Studio</h1>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full mb-6"></div>
          <p className="text-foreground/70 text-lg">
            Where Tradition Meets Modern Elegance
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gold/20 mb-12">
          <h2 className="font-serif text-3xl text-wine mb-6">Our Story</h2>
          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>
              Miss Studio was born out of a profound love for the rich heritage of Indian textiles. We curate exquisite sarees designed for today&apos;s graceful women, blending the timeless elegance of tradition with modern luxury aesthetics.
            </p>
            <p>
              <strong>We are an exclusive online boutique.</strong> Operating purely as an online business allows us to ship our beautiful collections all over India directly to your doorstep. As an online-first brand, we do not have a physical storefront for visits, ensuring that we focus all our energy on providing you with the best online shopping experience and customer support.
            </p>
            <p>
              Based out of Thiruvottiyur, Chennai, we take pride in delivering quality, authenticity, and impeccable service to every customer across the country.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
