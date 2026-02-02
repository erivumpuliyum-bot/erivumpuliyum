import { cn } from "@/lib/utils";

interface SkeletonShimmerProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const SkeletonShimmer = ({
  className,
  variant = 'rectangular',
  width,
  height,
}: SkeletonShimmerProps) => {
  const baseStyles = "relative overflow-hidden bg-muted";
  
  const variantStyles = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  const shimmerStyles = `
    before:absolute before:inset-0
    before:-translate-x-full
    before:animate-[shimmer_1.5s_infinite]
    before:bg-gradient-to-r
    before:from-transparent
    before:via-white/20
    before:to-transparent
  `;

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], shimmerStyles, className)}
      style={{ width, height }}
    />
  );
};

// Predefined skeleton components for common use cases
export const TextSkeleton = ({ lines = 1, className }: { lines?: number; className?: string }) => (
  <div className={cn("space-y-2", className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <SkeletonShimmer
        key={i}
        variant="text"
        className={cn("h-4", i === lines - 1 && lines > 1 ? "w-3/4" : "w-full")}
      />
    ))}
  </div>
);

export const CardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("bg-card rounded-2xl p-6 space-y-4", className)}>
    <SkeletonShimmer className="h-48 w-full" />
    <SkeletonShimmer variant="text" className="h-6 w-3/4" />
    <TextSkeleton lines={2} />
    <div className="flex gap-2">
      <SkeletonShimmer className="h-6 w-16 rounded-full" />
      <SkeletonShimmer className="h-6 w-20 rounded-full" />
    </div>
  </div>
);

export const TestimonialSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("bg-card rounded-2xl p-6 space-y-4", className)}>
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonShimmer key={i} variant="circular" className="h-5 w-5" />
      ))}
    </div>
    <TextSkeleton lines={3} />
    <div className="flex items-center gap-3">
      <SkeletonShimmer variant="circular" className="h-12 w-12" />
      <div className="space-y-2">
        <SkeletonShimmer variant="text" className="h-4 w-24" />
        <SkeletonShimmer variant="text" className="h-3 w-32" />
      </div>
    </div>
  </div>
);

export const LocationSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("grid lg:grid-cols-2 gap-6", className)}>
    <div className="bg-white/10 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <SkeletonShimmer variant="circular" className="h-12 w-12 bg-white/20" />
        <SkeletonShimmer className="h-8 w-32 bg-white/20" />
      </div>
      <SkeletonShimmer className="h-24 w-full bg-white/20" />
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <SkeletonShimmer variant="circular" className="h-10 w-10 bg-white/20" />
          <SkeletonShimmer className="h-4 w-32 bg-white/20" />
        </div>
        <div className="flex items-center gap-3">
          <SkeletonShimmer variant="circular" className="h-10 w-10 bg-white/20" />
          <SkeletonShimmer className="h-4 w-40 bg-white/20" />
        </div>
      </div>
      <SkeletonShimmer className="h-12 w-full bg-white/20" />
    </div>
    <SkeletonShimmer className="h-80 w-full bg-white/20" />
  </div>
);

export const BestSellerSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("flex-shrink-0 w-48 md:w-56", className)}>
    <SkeletonShimmer className="h-40 md:h-48 w-full rounded-xl" />
    <SkeletonShimmer variant="text" className="h-4 w-3/4 mx-auto mt-3" />
  </div>
);

export default SkeletonShimmer;
