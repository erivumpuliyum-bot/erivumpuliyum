import { useState, useEffect } from 'react';
import spicesImage from '@/assets/spices-image.jpg';
import chefCooking from '@/assets/chef-cooking.jpg';
import { AnimatedSection } from '@/components/ui/animated-section';
import { SkeletonShimmer } from '@/components/ui/skeleton-shimmer';

const About = () => {
  const [imagesLoaded, setImagesLoaded] = useState({ spices: false, chef: false });

  useEffect(() => {
    // Preload images
    const spicesImg = new Image();
    spicesImg.src = spicesImage;
    spicesImg.onload = () => setImagesLoaded(prev => ({ ...prev, spices: true }));

    const chefImg = new Image();
    chefImg.src = chefCooking;
    chefImg.onload = () => setImagesLoaded(prev => ({ ...prev, chef: true }));
  }, []);

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-gray-900 mb-2">Our Story</h2>
          <div className="w-20 h-1 bg-red-500 mx-auto" />
        </AnimatedSection>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left - Text */}
          <AnimatedSection animation="slide-right" delay={100}>
            <div className="bg-gray-50 rounded-3xl p-8 md:p-10 shadow-lg transition-all duration-300 hover:shadow-xl">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                At <span className="text-green-600 font-semibold">Erivum Puliyum Restaurant</span>, we bring the true taste of Kerala to Bangalore. Inspired by age-old family recipes, our dishes are cooked using freshly ground spices, coconut-based gravies, and traditional techniques passed down through generations.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                From hearty Kerala meals served on banana leaves to rich seafood curries infused with kudampuli, every dish reflects the soul of <span className="text-green-600 font-semibold italic">God's Own Country</span>.
              </p>
            </div>
          </AnimatedSection>

          {/* Right - Images Grid */}
          <AnimatedSection animation="slide-left" delay={200}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                  {!imagesLoaded.spices && (
                    <SkeletonShimmer className="absolute inset-0 h-48" />
                  )}
                  <img
                    src={spicesImage}
                    alt="Authentic Spices"
                    className={`w-full h-48 object-cover transition-all duration-700 group-hover:scale-110 ${
                      imagesLoaded.spices ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
                <div className="bg-red-500 rounded-2xl p-6 text-center text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group cursor-default">
                  <span className="text-3xl mb-2 block transition-transform duration-300 group-hover:scale-125">🍲</span>
                  <p className="font-semibold">Made with Love</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-green-600 rounded-2xl p-6 text-center text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group cursor-default">
                  <span className="text-3xl mb-2 block transition-transform duration-300 group-hover:scale-125">🌶️</span>
                  <p className="font-semibold">Authentic Spices</p>
                </div>
                <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                  {!imagesLoaded.chef && (
                    <SkeletonShimmer className="absolute inset-0 h-48" />
                  )}
                  <img
                    src={chefCooking}
                    alt="Chef Cooking"
                    className={`w-full h-48 object-cover transition-all duration-700 group-hover:scale-110 ${
                      imagesLoaded.chef ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mt-16 max-w-3xl mx-auto">
          {[
            { value: '8', suffix: '+', label: 'Years of Tradition', color: 'text-red-500' },
            { value: '100', suffix: '+', label: 'Authentic Dishes', color: 'text-green-600' },
            { value: '5L', suffix: '+', label: 'Happy Guests', color: 'text-orange-500' },
          ].map((stat, index) => (
            <AnimatedSection 
              key={stat.label} 
              animation="scale-in" 
              delay={300 + index * 150}
            >
              <div className="group bg-gray-50 rounded-2xl px-10 py-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-default">
                <p className={`font-display text-4xl ${stat.color} mb-1 transition-transform duration-300 group-hover:scale-110`}>
                  {stat.value}<sup>{stat.suffix}</sup>
                </p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
