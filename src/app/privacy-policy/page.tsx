import FadeInView from "@/components/FadeInView";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-16 px-4">
      <FadeInView>
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="font-serif text-4xl md:text-5xl text-wine-dark tracking-wide">Privacy Policy</h1>
          <p className="text-wine-dark/70 font-light leading-relaxed">
            At Miss Studio, we take your privacy seriously. This page is currently being updated to reflect our latest policies. Please check back soon.
          </p>
        </div>
      </FadeInView>
    </div>
  );
}
