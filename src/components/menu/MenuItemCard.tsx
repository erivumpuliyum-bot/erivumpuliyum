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
          <Flame key={i} className="w-3.5 h-3.5 text-orange-500" />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-border/50">
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="relative sm:w-40 md:w-48 flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-40 sm:h-full object-cover"
            />
          ) : (
            <div className="w-full h-40 sm:h-full bg-muted flex items-center justify-center">
              <span className="text-4xl">🍽️</span>
            </div>
          )}
          {isBestSeller && (
            <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
              ⭐ Bestseller
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-center">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              {/* Veg/Non-Veg Indicator */}
              <span
                className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${
                  isVegetarian
                    ? 'border-green-600'
                    : 'border-red-600'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isVegetarian ? 'bg-green-600' : 'bg-red-600'
                  }`}
                />
              </span>
              <h3 className="font-display text-lg md:text-xl text-foreground font-semibold">
                {name}
              </h3>
            </div>
            {getSpiceIcons(spiceLevel)}
          </div>

          {description && (
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {description}
            </p>
          )}

          {/* Vegetarian badge for veg items */}
          {isVegetarian && (
            <div className="flex items-center gap-1 mt-3 text-green-600 text-xs font-medium">
              <Leaf className="w-3.5 h-3.5" />
              <span>Pure Vegetarian</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
