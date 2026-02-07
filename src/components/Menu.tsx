import { useState, useEffect } from 'react';
import { ArrowRight, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AnimatedSection } from '@/components/ui/animated-section';
import { SkeletonShimmer } from '@/components/ui/skeleton-shimmer';

interface GalleryImage {
  id: string;
  title: string;
  image_url: string;
  category: string | null;
}

const Menu = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('id, title, image_url, category')
        .eq('is_active', true)
        .eq('category', 'Food')
        .order('display_order', { ascending: true })
        .limit(4);

      if (error) {
        console.error('Error fetching gallery images:', error);
        setLoading(false);
        return;
      }

      setGalleryImages(data || []);
      setLoading(false);
    };

    fetchGalleryImages();
  }, []);
  return (
    <section id="menu" className="py-20 bg-muted overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection animation="fade-up" className="text-center mb-12">
          <span className="text-4xl mb-4 block animate-float">👨‍🍳</span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">From Our Kitchen</h2>
          <p className="text-muted-foreground text-lg">Discover our most beloved dishes, crafted with love and tradition</p>
          <div className="w-20 h-1 bg-destructive mx-auto mt-4" />
        </AnimatedSection>

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-lg">
                <SkeletonShimmer className="h-48 w-full" />
                <div className="p-5 space-y-3">
                  <SkeletonShimmer className="h-6 w-3/4" />
                  <SkeletonShimmer className="h-4 w-full" />
                  <SkeletonShimmer className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && galleryImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No featured dishes available yet.</p>
          </div>
        )}

        {/* Dishes Grid */}
        {!loading && galleryImages.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {galleryImages.map((dish, index) => (
              <AnimatedSection 
                key={dish.id} 
                animation="fade-up" 
                delay={index * 100}
              >
                <div className="group bg-card rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={dish.image_url}
                      alt={dish.title}
                      loading="lazy"
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl text-foreground mb-2 transition-colors group-hover:text-primary">{dish.title}</h3>
                    <span className="inline-block text-xs px-2 py-1 rounded-full bg-primary/10 text-primary mb-3">
                      {dish.category || 'Food'}
                    </span>
                    <Link 
                      to="/menu" 
                      className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all group/btn"
                    >
                      Know More <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}

        {/* View Full Menu Button */}
        <AnimatedSection animation="fade-up" delay={500} className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Want to explore more delicious options?</p>
          <Link
            to="/menu"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <Utensils className="w-5 h-5 transition-transform group-hover:rotate-12" />
            View Full Menu
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Menu;
