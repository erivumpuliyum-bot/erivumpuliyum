import { MapPin, Clock, Phone, Utensils, ChevronDown } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative h-screen w-full overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark Green Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 via-green-800/35 to-green-900/50" />
      
      {/* Additional soft gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 via-transparent to-green-900/30" />

      {/* Content Container - Centered */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Main Content - Centered */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Restaurant Name - Kerala-inspired serif font */}
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold italic tracking-wider mb-6 md:mb-8"
            style={{ 
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              color: '#FDF8F3',
              textShadow: '2px 4px 20px rgba(0,0,0,0.4)',
              letterSpacing: '0.08em'
            }}
          >
            Erivum Puliyum
          </h1>
          
          {/* Tagline - Refined serif */}
          <p 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl italic font-light mb-10 md:mb-14"
            style={{ 
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              color: 'rgba(253, 248, 243, 0.95)',
              textShadow: '1px 2px 10px rgba(0,0,0,0.3)',
              letterSpacing: '0.05em'
            }}
          >
            Where Taste Meets Tradition
          </p>

          {/* CTA Buttons - Centered */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => scrollToSection('#menu')}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-green-700 hover:bg-green-800 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <Utensils className="w-5 h-5" />
              Explore Our Dishes
            </button>
            <button
              onClick={() => scrollToSection('#locations')}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-white/15 backdrop-blur-sm border-2 border-white/50 text-white rounded-full font-semibold text-lg hover:bg-white/25 transition-all duration-300"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <MapPin className="w-5 h-5" />
              Find Us
            </button>
          </div>

          {/* Info Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8">
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="w-5 h-5 text-rose-300" />
              <span className="font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>Marathahalli</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-white/90">
              <Clock className="w-5 h-5" />
              <span style={{ fontFamily: "'Poppins', sans-serif" }}>11:30 AM – 11:00 PM</span>
            </div>
            <a
              href="tel:08951755121"
              className="flex items-center gap-2 px-5 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-medium transition-all duration-300 shadow-lg"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <Phone className="w-4 h-4" />
              089517 55121
            </a>
          </div>
        </div>

        {/* Scroll Indicator - Bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-white/60 text-sm tracking-widest mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
            SCROLL TO DISCOVER
          </p>
          <button
            onClick={() => scrollToSection('#about')}
            className="text-white/60 hover:text-white transition-colors animate-bounce"
          >
            <div className="w-7 h-12 border-2 border-white/40 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-white/60 rounded-full" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
