import { Skeleton } from '@/components/ui/skeleton';

const MenuItemSkeleton = () => {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-md border border-border/50">
      <div className="flex flex-row">
        {/* Image Skeleton */}
        <div className="w-24 h-24 sm:w-32 sm:h-28 md:w-40 md:h-32 flex-shrink-0">
          <Skeleton className="w-full h-full" />
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 p-3 sm:p-4 flex flex-col justify-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Skeleton className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm flex-shrink-0" />
            <Skeleton className="h-4 sm:h-5 w-3/4" />
          </div>
          <Skeleton className="h-3 sm:h-4 w-full" />
          <Skeleton className="h-3 sm:h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default MenuItemSkeleton;
