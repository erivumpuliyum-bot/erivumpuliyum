import { Flame, Leaf } from 'lucide-react';

interface MenuItemCardProps {
  name: string;
  description: string | null;
  imageUrl: string | null;
  spiceLevel: string | null;
  isVegetarian: boolean;
  isBestSeller: boolean;
}

const MenuItemCard = ({
  name,
  description,
  imageUrl,
  spiceLevel,
  isVegetarian,
  isBestSeller,
}: MenuItemCardProps) => {
  const getSpiceIcons = (level: string | null) => {
    if (!level) return null;
    const count = level.toLowerCase() === 'mild' ? 1 : level.toLowerCase() === 'medium' ? 2 : 3;
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: count }).map((_, i) => (
          <Flame key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-border/50">
      <div className="flex flex-row">
        {/* Image Section - Compact on mobile */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-auto md:w-40 flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-2xl sm:text-3xl">🍽️</span>
            </div>
          )}
          {isBestSeller && (
            <span className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-orange-500 text-white text-[10px] sm:text-xs font-medium px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-sm">
              ⭐ Best
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-3 sm:p-4 flex flex-col justify-center min-w-0">
          <div className="flex items-start justify-between gap-1 sm:gap-2 mb-1 sm:mb-2">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              {/* Veg/Non-Veg Indicator */}
              <span
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm border-2 flex items-center justify-center flex-shrink-0 ${
                  isVegetarian
                    ? 'border-green-600'
                    : 'border-red-600'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                    isVegetarian ? 'bg-green-600' : 'bg-red-600'
                  }`}
                />
              </span>
              <h3 className="font-display text-sm sm:text-base md:text-lg text-foreground font-semibold truncate">
                {name}
              </h3>
            </div>
            <div className="flex-shrink-0">
              {getSpiceIcons(spiceLevel)}
            </div>
          </div>

          {description && (
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-2">
              {description}
            </p>
          )}

          {/* Vegetarian badge for veg items - hidden on very small screens */}
          {isVegetarian && (
            <div className="hidden sm:flex items-center gap-1 mt-2 text-green-600 text-xs font-medium">
              <Leaf className="w-3 h-3" />
              <span>Pure Vegetarian</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
