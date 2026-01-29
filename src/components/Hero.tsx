import { MapPin, Clock, Phone, Utensils } from 'lucide-react';
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
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-green-400 via-green-500 to-green-600">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Kathakali Face - Right Side */}
      <div className="absolute right-0 top-16 w-[45%] h-full hidden lg:block pointer-events-none">
        <img
          src={kathakali}
          alt="Kathakali"
          className="w-full h-auto object-contain opacity-90"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col pt-28">
        <div className="flex-1 grid lg:grid-cols-2 gap-4 items-center">
          {/* Left - Coconut Image */}
          <div className="flex justify-center lg:justify-start">
            <img
              src={heroCoconut}
              alt="Kerala Feast in Coconut"
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Right - Text Content */}
          <div className="text-center lg:text-left lg:pl-4">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-normal italic tracking-wider mb-4">
              Erivum Puliyum
            </h1>
            <p className="text-white/90 text-xl md:text-2xl lg:text-3xl italic font-light mb-10">
              Where Taste Meets Tradition
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('#menu')}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-green-700 text-white rounded-full font-semibold text-lg hover:bg-green-800 transition-all shadow-xl"
              >
                <Utensils className="w-5 h-5" />
                Explore Our Dishes
              </button>
              <button
                onClick={() => scrollToSection('#locations')}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white/60 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
              >
                <MapPin className="w-5 h-5" />
                Find Us
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pb-6">
          {/* Info Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-6">
            <div className="flex items-center gap-2 text-white">
              <MapPin className="w-5 h-5 text-pink-400" />
              <span className="font-medium">Marathahalli</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white backdrop-blur-sm">
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
          <div className="text-center">
            <p className="text-white/70 text-sm tracking-widest mb-2">SCROLL TO DISCOVER</p>
            <button
              onClick={() => scrollToSection('#best-sellers')}
              className="text-white/70 hover:text-white transition-colors animate-bounce mx-auto block"
            >
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
                <div className="w-1 h-2 bg-white/70 rounded-full" />
              </div>
            </button>
          </div>
        </div>

        {/* EP Logo - Bottom Right */}
        <div className="absolute bottom-20 right-8 hidden lg:block">
          <div className="w-28 h-28 bg-green-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-green-500">
            <img src={epLogo} alt="EP" className="w-20 h-20 object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
