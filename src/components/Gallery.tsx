import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { X } from 'lucide-react';
import { SkeletonShimmer } from '@/components/ui/skeleton-shimmer';

interface GalleryImage {
  id: string;
  title: string;
  image_url: string;
  category: string | null;
}

// Progressive image component with blur-up loading
const ProgressiveImage = ({ 
  src, 
  alt, 
  className,
  onClick 
}: { 
  src: string; 
  alt: string; 
  className?: string;
  onClick?: () => void;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.01 }
    );

    const element = document.getElementById(`img-${src.slice(-20)}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [src]);

  return (
    <div 
      id={`img-${src.slice(-20)}`}
      className="relative w-full h-full overflow-hidden bg-muted"
      onClick={onClick}
    >
      {/* Placeholder skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0">
          <SkeletonShimmer className="w-full h-full" />
        </div>
      )}
      
      {/* Actual image - only load when in view */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`${className} transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('id, title, image_url, category')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

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

  const handleImageClick = useCallback((imageUrl: string) => {
    setSelectedImage(imageUrl);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-gray-900 mb-4">
            Our <span className="text-green-600">Gallery</span>
          </h2>
          <p className="text-gray-600 text-lg">A glimpse into the flavours and ambience of EP Kitchen</p>
          <div className="w-20 h-1 bg-red-500 mx-auto mt-4" />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonShimmer 
                key={i} 
                className={`rounded-xl ${i === 0 ? 'md:col-span-2 md:row-span-2 h-64 md:h-80' : 'h-40 md:h-48'}`} 
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && galleryImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No gallery images available yet.</p>
          </div>
        )}

        {/* Gallery Grid - Optimized with CSS containment */}
        {!loading && galleryImages.length > 0 && (
          <div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
            style={{ contain: 'layout style' }}
          >
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`relative overflow-hidden rounded-xl cursor-pointer group will-change-transform ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                style={{ contain: 'layout paint' }}
              >
                <ProgressiveImage
                  src={image.image_url}
                  alt={image.title}
                  onClick={() => handleImageClick(image.image_url)}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                    index === 0 ? 'h-64 md:h-full' : 'h-40 md:h-48'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                  <span className="inline-block px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full">
                    {image.category || 'Food'}
                  </span>
                  <p className="text-white font-medium mt-1">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox - Optimized */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery Image"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
