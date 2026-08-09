import FadeInView from "@/components/FadeInView";

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-16 px-4">
      <FadeInView>
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="font-serif text-4xl md:text-5xl text-wine-dark tracking-wide">Track Your Order</h1>
          <p className="text-wine-dark/70 font-light leading-relaxed">
            Order tracking functionality is currently under maintenance. Please check back soon.
          </p>
        </div>
      </FadeInView>
    </div>
  );
}
