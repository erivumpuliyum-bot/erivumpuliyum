import { useState, useEffect } from 'react';
import { Phone, MapPin, Menu, X } from 'lucide-react';
import epLogo from '@/assets/ep-logo-full.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Contact', href: '#locations' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={epLogo}
              alt="Erivum Puliyum Logo"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`font-medium transition-colors duration-200 ${
                  isScrolled
                    ? 'text-foreground hover:text-primary'
                    : 'text-primary-foreground/90 hover:text-primary-foreground'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Locations Badge */}
            <button
              onClick={() => scrollToSection('#locations')}
              className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                isScrolled
                  ? 'bg-primary/10 text-primary hover:bg-primary/20'
                  : 'bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30'
              }`}
            >
              <MapPin className="w-4 h-4" />
              2 Locations
            </button>

            {/* Call Button */}
            <a
              href="tel:08951755121"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isScrolled
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-primary-foreground text-primary hover:bg-primary-foreground/90'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">089517 55121</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${
                isScrolled ? 'text-foreground' : 'text-primary-foreground'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border/20 pt-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                    isScrolled
                      ? 'text-foreground hover:bg-muted'
                      : 'text-primary-foreground hover:bg-primary-foreground/10'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
