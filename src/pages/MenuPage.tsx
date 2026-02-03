import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MenuItemCard from '@/components/menu/MenuItemCard';
import MenuItemSkeleton from '@/components/menu/MenuItemSkeleton';
import { supabase } from '@/integrations/supabase/client';

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  category: string;
  image_url: string | null;
  spice_level: string | null;
  is_best_seller: boolean | null;
  is_active: boolean | null;
  is_vegetarian: boolean | null;
}

const MENU_CATEGORIES = [
  'Kerala Meals',
  'Starters',
  'Main Course – Veg',
  'Main Course – Non Veg',
  'Seafood Specials',
  'Bread & Rice',
  'Beverages',
  'Desserts',
];

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;
      setMenuItems(data || []);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter items by active category
  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  // Group items by category for display
  const groupedItems = MENU_CATEGORIES.reduce((acc, category) => {
    const categoryItems = filteredItems.filter(item => item.category === category);
    if (activeCategory === 'all' || activeCategory === category) {
      acc[category] = categoryItems;
    }
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner - Compact on mobile */}
      <div className="pt-16 sm:pt-20 md:pt-24 pb-6 sm:pb-8 md:pb-12 bg-primary">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-2 sm:mb-4 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Back to Home
          </Link>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-1 sm:mb-2">
            Our Menu
          </h1>
          <p className="text-primary-foreground/80 text-sm sm:text-base md:text-lg">
            Authentic Kerala cuisine crafted with love
          </p>
        </div>
      </div>

      {/* Category Filter - Smaller on mobile */}
      <div className="sticky top-14 sm:top-[60px] md:top-[68px] bg-card shadow-sm z-30 border-b border-border">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-2 scrollbar-hide -mx-1 px-1">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              All
            </button>
            {MENU_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 md:py-12">
        {loading ? (
          // Skeleton Loading State
          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            {[1, 2, 3].map((section) => (
              <div key={section}>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                  <div className="w-6 sm:w-8 h-1 bg-primary rounded" />
                  <div className="h-5 sm:h-6 md:h-8 w-32 sm:w-40 md:w-48 bg-muted rounded animate-pulse" />
                </div>
                <div className="grid gap-3 sm:gap-4 md:gap-6">
                  {[1, 2, 3].map((item) => (
                    <MenuItemSkeleton key={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : menuItems.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <span className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 block">🍽️</span>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              No menu items available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3">
                  <span className="w-5 sm:w-6 md:w-8 h-1 bg-primary rounded" />
                  {category}
                </h2>
                {items.length > 0 ? (
                  <div className="grid gap-2.5 sm:gap-3 md:gap-4">
                    {items.map(item => (
                      <MenuItemCard
                        key={item.id}
                        name={item.name}
                        description={item.description}
                        imageUrl={item.image_url}
                        spiceLevel={item.spice_level}
                        isVegetarian={item.is_vegetarian ?? false}
                        isBestSeller={item.is_best_seller ?? false}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-xs sm:text-sm italic py-3 sm:py-4 pl-7 sm:pl-9 md:pl-11">
                    No items in this category yet
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MenuPage;
