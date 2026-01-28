import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  variant?: "default" | "featured";
}

export const SkeletonCard = ({ variant = "default" }: SkeletonCardProps) => {
  const isFeatured = variant === "featured";

  return (
    <div
      className={cn(
        "bg-card rounded-lg border overflow-hidden",
        isFeatured && "md:col-span-2 lg:col-span-2"
      )}
    >
      {/* Image Skeleton */}
      <div
        className={cn(
          "skeleton-shimmer",
          isFeatured ? "aspect-[21/9]" : "aspect-video"
        )}
      />

      {/* Content Skeleton */}
      <div className={cn("p-4", isFeatured && "p-5 lg:p-6")}>
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3">
          <div className="skeleton-shimmer h-5 w-20 rounded" />
          <div className="skeleton-shimmer h-4 w-16 rounded" />
        </div>

        {/* Title */}
        <div className="space-y-2 mb-3">
          <div className={cn("skeleton-shimmer h-6 rounded", isFeatured ? "w-full" : "w-full")} />
          <div className={cn("skeleton-shimmer h-6 rounded", isFeatured ? "w-4/5" : "w-3/4")} />
        </div>

        {/* Summary */}
        <div className="space-y-2 mb-4">
          <div className="skeleton-shimmer h-4 w-full rounded" />
          <div className="skeleton-shimmer h-4 w-5/6 rounded" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="skeleton-shimmer h-4 w-20 rounded" />
            <div className="skeleton-shimmer h-4 w-16 rounded" />
          </div>
          <div className="skeleton-shimmer h-4 w-12 rounded" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SkeletonCard variant="featured" />
      {[...Array(5)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};
