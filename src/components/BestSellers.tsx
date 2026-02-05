import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AnimatedSection } from '@/components/ui/animated-section';
import { BestSellerSkeleton } from '@/components/ui/skeleton-shimmer';

interface GalleryImage {
  id: string;
  title: string;
  image_url: string;
  category: string | null;
}

const BestSellers = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch food photos from gallery
  useEffect(() => {
    const fetchGalleryImages = async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('id, title, image_url, category')
        .eq('category', 'Food')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching gallery images:', error);
        setLoading(false);
        return;
      }

      setGalleryItems(data || []);
      setLoading(false);
    };

    fetchGalleryImages();
  }, []);

  // Double the items for seamless infinite scroll
  const duplicatedItems = [...galleryItems, ...galleryItems];

  // Don't render if no gallery items
  if (!loading && galleryItems.length === 0) {
    return null;
  }

  return (
    <section id="bestsellers" className="py-16 bg-green-700 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection animation="fade-up">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-16 bg-orange-300" />
            <h2 className="flex items-center gap-2 text-orange-200 text-2xl md:text-3xl font-display">
              <Sparkles className="w-5 h-5 animate-pulse" />
              Our Bestsellers
              <Sparkles className="w-5 h-5 animate-pulse" />
            </h2>
            <div className="h-px w-16 bg-orange-300" />
          </div>
        </AnimatedSection>

        {/* Loading Skeleton */}
        {loading && (
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <BestSellerSkeleton key={i} className="opacity-50" />
            ))}
          </div>
        )}

        {/* Infinite Scroll Carousel */}
        {!loading && galleryItems.length > 0 && (
          <div className="overflow-hidden">
            <div 
              className="flex gap-6 animate-scroll hover:pause-animation"
              style={{ 
                width: 'max-content',
                animationDuration: `${duplicatedItems.length * 3}s`
              }}
            >
              {duplicatedItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex-shrink-0 w-48 md:w-56 group cursor-pointer"
                >
                  <div className="relative rounded-xl overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                    <div className="overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="text-white text-center mt-3 font-medium transition-transform duration-300 group-hover:-translate-y-1">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;
