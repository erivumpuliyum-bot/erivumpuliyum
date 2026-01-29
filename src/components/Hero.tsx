import { ChevronDown } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom mx-auto px-4 md:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Tagline */}
          <p className="text-secondary font-medium text-lg md:text-xl mb-4 animate-fade-in">
            Authentic Kerala Cuisine in Bangalore
          </p>

          {/* Main Heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-slide-up">
            Where Taste Meets{' '}
            <span className="text-secondary">Tradition</span>
          </h1>

          {/* Subtext */}
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Authentic Kerala flavours crafted with traditional spices, slow cooking, and homely warmth.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => scrollToSection('#menu')}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-1"
            >
              Explore Our Dishes
            </button>
            <button
              onClick={() => scrollToSection('#locations')}
              className="px-8 py-4 bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground border border-primary-foreground/30 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-primary-foreground/30 hover:-translate-y-1"
            >
              Find Us
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection('#about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/70 hover:text-primary-foreground transition-colors animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default Hero;
