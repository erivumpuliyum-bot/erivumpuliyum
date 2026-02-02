import { Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import fishCurry from '@/assets/dishes/fish-curry.jpg';
import keralaMeals from '@/assets/dishes/kerala-meals.jpg';
import malabarParotta from '@/assets/dishes/malabar-parotta.jpg';
import prawnsFry from '@/assets/dishes/prawns-fry.jpg';
import chickenRoast from '@/assets/dishes/chicken-roast.jpg';
import { AnimatedSection } from '@/components/ui/animated-section';
import { BestSellerSkeleton } from '@/components/ui/skeleton-shimmer';

const bestsellers = [
  { name: 'Chicken Curry', price: '₹190', image: chickenRoast },
  { name: 'Fish Curry (Kudampuli Style)', price: '₹220', image: fishCurry },
  { name: 'Malabar Parotta', price: '₹40', image: malabarParotta },
  { name: 'Kerala Veg Meals', price: '₹180', image: keralaMeals },
  { name: 'Prawn Roast', price: '₹260', image: prawnsFry },
];

// Double the items for seamless infinite scroll
const duplicatedItems = [...bestsellers, ...bestsellers];

const BestSellers = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  // Preload images
  useEffect(() => {
    let loaded = 0;
    bestsellers.forEach((item) => {
      const img = new Image();
      img.src = item.image;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === bestsellers.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !imagesLoaded) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 1;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      const halfWidth = scrollContainer.scrollWidth / 2;
      if (scrollPosition >= halfWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [imagesLoaded]);

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
        {!imagesLoaded && (
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <BestSellerSkeleton key={i} className="opacity-50" />
            ))}
          </div>
        )}

        {/* Infinite Scroll Carousel */}
        <div 
          ref={scrollRef}
          className={`flex gap-6 overflow-x-hidden transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0 h-0'}`}
          style={{ scrollBehavior: 'auto' }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 md:w-56 group cursor-pointer"
            >
              <div className="relative rounded-xl overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                {/* Price Badge */}
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 transition-transform group-hover:scale-110">
                  {item.price}
                </div>
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <p className="text-white text-center mt-3 font-medium transition-transform duration-300 group-hover:-translate-y-1">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
