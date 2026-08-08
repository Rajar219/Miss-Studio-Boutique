export default function ProductCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-background/50 border border-gold/10 flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[3/4] bg-foreground/10 shrink-0 w-full" />
      
      {/* Content Skeleton */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Category */}
        <div className="h-3 bg-foreground/10 rounded w-1/4 mb-1" />
        
        {/* Title */}
        <div className="h-6 bg-foreground/10 rounded w-3/4 mb-2" />
        
        {/* Fabric/Color */}
        <div className="flex gap-2">
          <div className="h-3 bg-foreground/10 rounded w-1/3" />
          <div className="h-3 bg-foreground/10 rounded w-1/4" />
        </div>
        
        {/* Price and Button */}
        <div className="mt-auto space-y-4 pt-4">
          <div className="flex justify-between items-end">
            <div className="h-5 bg-foreground/10 rounded w-1/3" />
          </div>
          
          <div className="h-10 w-full bg-foreground/10 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
