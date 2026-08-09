export default function CollectionLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-background animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="relative w-full h-[60vh] md:h-[70vh] bg-foreground/5 flex flex-col items-center justify-center">
        <div className="w-32 h-4 bg-foreground/10 rounded mb-6"></div>
        <div className="w-64 md:w-96 h-16 md:h-24 bg-foreground/10 rounded mb-6"></div>
        <div className="w-48 md:w-80 h-4 bg-foreground/10 rounded"></div>
      </section>

      {/* Grid Skeleton */}
      <section className="py-24 md:py-32 bg-background border-t border-gold/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div className="w-48 h-8 bg-foreground/10 rounded"></div>
            <div className="w-24 h-4 bg-foreground/10 rounded"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex flex-col">
                <div className="aspect-[3/4] w-full rounded-2xl bg-foreground/5 mb-4"></div>
                <div className="w-3/4 h-5 bg-foreground/10 rounded mb-2"></div>
                <div className="w-1/2 h-4 bg-foreground/10 rounded mb-4"></div>
                <div className="w-full h-10 bg-foreground/10 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
