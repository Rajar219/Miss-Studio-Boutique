import FadeInView from "@/components/FadeInView";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Exchanges | Miss Studio",
  description: "Miss Studio's return and exchange policy. Hassle-free returns within 14 days.",
  alternates: {
    canonical: "/returns",
  },
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-16 px-4">
      <FadeInView>
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="font-serif text-4xl md:text-5xl text-wine-dark tracking-wide">Returns & Exchanges</h1>
          <p className="text-wine-dark/70 font-light leading-relaxed">
            Our returns and exchanges policy is currently being updated. Please check back soon.
          </p>
        </div>
      </FadeInView>
    </div>
  );
}
