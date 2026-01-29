import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Settings } from 'lucide-react';
import epLogo from '@/assets/ep-logo-full.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Main Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white'}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src={epLogo}
                alt="Erivum Puliyum"
                className="h-12 md:h-14 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-gray-700 hover:text-green-700 font-medium transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Call Button */}
            <a
              href="tel:08951755121"
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-all shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">089517 55121</span>
            </a>
          </div>
        </div>
      </header>

      {/* Sub Header */}
      <div className="fixed top-[60px] md:top-[68px] left-0 right-0 z-40 bg-green-700">
        <div className="container mx-auto px-4 py-2 flex justify-end items-center gap-4">
          <span className="text-white/80 text-sm hidden sm:inline">Management & Staff:</span>
          <Link
            to="/auth"
            className="flex items-center gap-1.5 text-white text-sm hover:text-white/80 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Admin
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
