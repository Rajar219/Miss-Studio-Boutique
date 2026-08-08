export default function ProductDetailsLoading() {
  return (
    <div className="bg-background min-h-screen pt-8 pb-24">
      <div className="container mx-auto px-4 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="flex gap-2 mb-8">
          <div className="h-4 w-16 bg-foreground/10 rounded"></div>
          <div className="h-4 w-4 bg-foreground/10 rounded"></div>
          <div className="h-4 w-24 bg-foreground/10 rounded"></div>
          <div className="h-4 w-4 bg-foreground/10 rounded"></div>
          <div className="h-4 w-32 bg-foreground/10 rounded"></div>
        </div>

        <div className="h-6 w-40 bg-foreground/10 rounded mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery Skeleton */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:w-24 shrink-0">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="w-20 h-24 lg:w-full lg:h-32 bg-foreground/10 rounded-lg shrink-0" />
              ))}
            </div>
            <div className="aspect-[3/4] w-full rounded-2xl bg-foreground/10" />
          </div>

          {/* Product Info Skeleton */}
          <div className="flex flex-col">
            <div className="h-4 w-24 bg-foreground/10 rounded mb-2"></div>
            <div className="h-10 md:h-12 w-3/4 bg-foreground/10 rounded mb-4"></div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="h-8 w-24 bg-foreground/10 rounded"></div>
              <div className="h-4 w-32 bg-foreground/10 rounded"></div>
            </div>

            <div className="space-y-2 mb-8">
              <div className="h-4 w-full bg-foreground/10 rounded"></div>
              <div className="h-4 w-full bg-foreground/10 rounded"></div>
              <div className="h-4 w-5/6 bg-foreground/10 rounded"></div>
            </div>

            {/* Actions Skeleton */}
            <div className="flex gap-4 mb-10">
              <div className="flex-1 h-14 bg-foreground/10 rounded-full"></div>
              <div className="w-14 h-14 rounded-full bg-foreground/10 shrink-0"></div>
              <div className="w-14 h-14 rounded-full bg-foreground/10 shrink-0"></div>
            </div>

            {/* Details Skeleton */}
            <div className="border-t border-gold/20 pt-8">
              <div className="h-6 w-40 bg-foreground/10 rounded mb-4"></div>
              <div className="space-y-3 mb-8">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <div key={idx} className="h-4 w-2/3 bg-foreground/10 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
