import { useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink, Leaf } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { LocationSkeleton } from '@/components/ui/skeleton-shimmer';

const locations = [
  {
    id: 1,
    name: 'Marathahalli',
    branch: 'Marathahalli Branch',
    restaurant: 'Erivum Puliyum Restaurant (EP Kitchen)',
    address: [
      '560, AECS Layout Main Road,',
      'AECS Layout – A Block,',
      'Marathahalli, Bengaluru,',
      'Karnataka – 560037'
    ],
    phone: '+91 90082 38101',
    hours: '11:30 AM – 11:00 PM',
    days: 'Monday – Sunday',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0123456789!2d77.6987654!3d12.9876543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sErivum%20Puliyum!5e0!3m2!1sen!2sin!4v1234567890',
    mapsUrl: 'https://maps.google.com/?q=Erivum+Puliyum+Marathahalli+Bangalore',
  },
  {
    id: 2,
    name: 'Bellandur',
    branch: 'Bellandur Branch',
    restaurant: 'Erivum Puliyum Restaurant (EP Kitchen)',
    address: [
      'Ground Floor, No. 6 & 7,',
      'Ambalipura – Sarjapur Road,',
      'Behind Louis Philippe Showroom,',
      'Bellandur, Bengaluru,',
      'Karnataka – 560102'
    ],
    phone: '089517 55121',
    hours: '11:30 AM – 11:00 PM',
    days: 'Monday – Sunday',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0123456789!2d77.6987654!3d12.9876543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sErivum%20Puliyum!5e0!3m2!1sen!2sin!4v1234567890',
    mapsUrl: 'https://maps.google.com/?q=Erivum+Puliyum+Bellandur+Bangalore',
  },
];

const Locations = () => {
  const [mapsLoaded, setMapsLoaded] = useState<Record<number, boolean>>({});

  const handleMapLoad = (id: number) => {
    setMapsLoaded(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section id="locations" className="py-20 bg-gradient-to-b from-green-600 to-green-700 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection animation="fade-up" className="text-center mb-12">
          <span className="text-4xl mb-4 block animate-float">📍</span>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">Our Locations</h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Visit us at either of our two locations in Bengaluru for an authentic Kerala dining experience.
          </p>
        </AnimatedSection>

        {/* Location Cards */}
        <div className="space-y-12 max-w-6xl mx-auto">
          {locations.map((location, index) => (
            <AnimatedSection 
              key={location.id} 
              animation={index % 2 === 0 ? 'slide-right' : 'slide-left'}
              delay={index * 200}
            >
              {/* Branch Title */}
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-yellow-300 animate-pulse" />
                <h3 className="text-white text-xl font-semibold italic">{location.branch}</h3>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Left - Info Card */}
                <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 hover:bg-white/15">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-white text-2xl font-display">{location.name}</h4>
                  </div>

                  <div className="bg-white/10 rounded-xl p-5 mb-4 transition-colors duration-300 hover:bg-white/15">
                    <p className="text-white font-semibold mb-2">{location.restaurant}</p>
                    {location.address.map((line, i) => (
                      <p key={i} className="text-white/80 text-sm">{line}</p>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 group/item">
                      <div className="w-10 h-10 bg-green-500/30 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/item:scale-110">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <a href={`tel:${location.phone.replace(/\s/g, '')}`} className="text-white font-medium hover:text-white/80 transition-colors">
                        {location.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 group/item">
                      <div className="w-10 h-10 bg-red-500/30 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/item:scale-110">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{location.hours}</p>
                        <p className="text-white/70 text-sm">{location.days}</p>
                      </div>
                    </div>
                  </div>

                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center justify-center gap-2 w-full py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:rotate-12" />
                    View on Google Maps
                  </a>
                </div>

                {/* Right - Map */}
                <div className="rounded-2xl overflow-hidden shadow-xl bg-white h-80 lg:h-auto relative">
                  {/* Map skeleton */}
                  {!mapsLoaded[location.id] && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                      <MapPin className="w-12 h-12 text-gray-400 animate-bounce" />
                    </div>
                  )}
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location.restaurant + ' ' + location.name + ' Bangalore')}&zoom=15`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '300px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map - ${location.name}`}
                    onLoad={() => handleMapLoad(location.id)}
                    className={`transition-opacity duration-500 ${mapsLoaded[location.id] ? 'opacity-100' : 'opacity-0'}`}
                  />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Feature Tags */}
        <AnimatedSection animation="fade-up" delay={400} className="flex flex-wrap justify-center gap-4 mt-16">
          <div className="flex items-center gap-2 px-5 py-3 bg-white/10 rounded-full text-white transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 cursor-default">
            <span className="animate-pulse">🍲</span>
            <span>Authentic Kerala Cuisine</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-3 bg-green-800/50 rounded-full text-white transition-all duration-300 hover:bg-green-800/70 hover:-translate-y-1 cursor-default">
            <span className="animate-pulse">🥥</span>
            <span>Traditional Recipes</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-3 bg-green-800/50 rounded-full text-white transition-all duration-300 hover:bg-green-800/70 hover:-translate-y-1 cursor-default">
            <span className="animate-pulse">🌿</span>
            <span>Fresh Ingredients</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Locations;
