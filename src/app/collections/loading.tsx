import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export default function CollectionsLoading() {
  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4">
        {/* Page Header Skeleton */}
        <div className="text-center mb-16 animate-pulse">
          <div className="h-10 md:h-12 w-64 bg-foreground/10 mx-auto rounded mb-4"></div>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full mb-6"></div>
          <div className="h-4 w-full max-w-2xl bg-foreground/10 mx-auto rounded mb-2"></div>
          <div className="h-4 w-3/4 max-w-xl bg-foreground/10 mx-auto rounded"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar Skeleton */}
          <div className="w-full lg:w-64 shrink-0 animate-pulse">
            <div className="sticky top-32">
              <div className="h-6 w-32 bg-foreground/10 rounded mb-6 pb-2"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-4 w-3/4 bg-foreground/10 rounded"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 animate-pulse">
              <div className="h-4 w-32 bg-foreground/10 rounded"></div>
              <div className="h-10 w-48 bg-foreground/10 rounded"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
