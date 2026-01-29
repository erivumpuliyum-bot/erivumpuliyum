import { MapPin, Clock, Phone, ChevronDown, Utensils } from 'lucide-react';
import heroCoconut from '@/assets/hero-coconut.png';
import kathakali from '@/assets/kathakali-face.png';
import epLogo from '@/assets/ep-logo-full.png';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen pt-24 overflow-hidden bg-gradient-to-br from-green-500 via-green-600 to-green-700">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Kathakali Face - Right Side */}
      <div className="absolute right-0 top-20 w-1/3 h-full hidden lg:block">
        <img
          src={kathakali}
          alt="Kathakali"
          className="w-full h-auto object-contain opacity-80"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-8 md:pt-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[70vh]">
          {/* Left - Coconut Image */}
          <div className="flex justify-center lg:justify-start">
            <img
              src={heroCoconut}
              alt="Kerala Feast in Coconut"
              className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl h-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Right - Text Content */}
          <div className="text-center lg:text-left lg:pl-8">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-bold italic tracking-wide mb-4">
              Erivum Puliyum
            </h1>
            <p className="text-white/90 text-xl md:text-2xl lg:text-3xl italic font-light mb-8">
              Where Taste Meets Tradition
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button
                onClick={() => scrollToSection('#menu')}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-green-800 text-white rounded-full font-semibold text-lg hover:bg-green-900 transition-all shadow-xl"
              >
                <Utensils className="w-5 h-5" />
                Explore Our Dishes
              </button>
              <button
                onClick={() => scrollToSection('#locations')}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white/50 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
              >
                <MapPin className="w-5 h-5" />
                Find Us
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 py-6">
          <div className="flex items-center gap-2 text-white">
            <MapPin className="w-5 h-5 text-pink-400" />
            <span className="font-medium">Marathahalli</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white">
            <Clock className="w-5 h-5" />
            <span>11:30 AM – 11:00 PM</span>
          </div>
          <a
            href="tel:08951755121"
            className="flex items-center gap-2 px-5 py-2 bg-rose-400 text-white rounded-full font-medium hover:bg-rose-500 transition-all"
          >
            <Phone className="w-4 h-4" />
            089517 55121
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center pb-8">
          <p className="text-white/70 text-sm tracking-widest mb-2">SCROLL TO DISCOVER</p>
          <button
            onClick={() => scrollToSection('#about')}
            className="text-white/70 hover:text-white transition-colors animate-bounce"
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-white/70 rounded-full" />
            </div>
          </button>
        </div>

        {/* EP Logo - Bottom Right */}
        <div className="absolute bottom-24 right-8 hidden lg:block">
          <div className="w-32 h-32 bg-green-600 rounded-full flex items-center justify-center shadow-2xl">
            <img src={epLogo} alt="EP" className="w-24 h-24 object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
