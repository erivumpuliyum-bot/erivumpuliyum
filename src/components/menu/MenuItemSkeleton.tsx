import { Skeleton } from '@/components/ui/skeleton';

const MenuItemSkeleton = () => {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-md border border-border/50">
      <div className="flex flex-col sm:flex-row">
        {/* Image Skeleton */}
        <div className="relative sm:w-40 md:w-48 flex-shrink-0">
          <Skeleton className="w-full h-40 sm:h-32" />
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-center gap-3">
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-sm" />
            <Skeleton className="h-6 w-3/4" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default MenuItemSkeleton;
