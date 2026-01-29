import { Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import fishCurry from '@/assets/dishes/fish-curry.jpg';
import keralaMeals from '@/assets/dishes/kerala-meals.jpg';
import malabarParotta from '@/assets/dishes/malabar-parotta.jpg';
import prawnsFry from '@/assets/dishes/prawns-fry.jpg';
import beefFry from '@/assets/dishes/beef-fry.jpg';
import chickenRoast from '@/assets/dishes/chicken-roast.jpg';

const bestsellers = [
  { name: 'Chicken Curry', price: '₹190', image: chickenRoast },
  { name: 'Fish Curry (Kudampuli Style)', price: '₹220', image: fishCurry },
  { name: 'Malabar Parotta', price: '₹40', image: malabarParotta },
  { name: 'Kerala Veg Meals', price: '₹180', image: keralaMeals },
  { name: 'Prawn Roast', price: '₹260', image: prawnsFry },
  { name: 'Beef Fry (Kerala Style)', price: '₹230', image: beefFry },
];

// Double the items for seamless infinite scroll
const duplicatedItems = [...bestsellers, ...bestsellers];

const BestSellers = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 1; // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when we've scrolled through first set of items
      const halfWidth = scrollContainer.scrollWidth / 2;
      if (scrollPosition >= halfWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause on hover
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
  }, []);

  return (
    <section id="best-sellers" className="py-16 bg-green-700">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-16 bg-orange-300" />
          <h2 className="flex items-center gap-2 text-orange-200 text-2xl md:text-3xl font-display">
            <Sparkles className="w-5 h-5" />
            Our Bestsellers
            <Sparkles className="w-5 h-5" />
          </h2>
          <div className="h-px w-16 bg-orange-300" />
        </div>

        {/* Infinite Scroll Carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden"
          style={{ scrollBehavior: 'auto' }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 md:w-56"
            >
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                {/* Price Badge */}
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                  {item.price}
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 md:h-48 object-cover"
                />
              </div>
              <p className="text-white text-center mt-3 font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
