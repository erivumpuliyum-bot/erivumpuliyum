import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Settings } from 'lucide-react';
import epLogo from '@/assets/ep-logo-full.png';

interface NavLink {
  name: string;
  href: string;
  isRoute?: boolean;
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [{
    name: 'About',
    href: '#about'
  }, {
    name: 'Menu',
    href: '#menu'
  }, {
    name: 'Gallery',
    href: '/gallery',
    isRoute: true
  }, {
    name: 'Reviews',
    href: '#testimonials'
  }, {
    name: 'Contact',
    href: '#locations'
  }];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (link: NavLink) => {
    if (link.isRoute) {
      navigate(link.href);
    } else {
      // If not on homepage, navigate home first then scroll
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection(link.href), 100);
      } else {
        scrollToSection(link.href);
      }
    }
  };

  return <>
      {/* Main Header - Transparent initially, solid on scroll */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-green-700 shadow-lg' : 'bg-gradient-to-b from-green-900/60 via-green-800/30 to-transparent'}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img alt="Erivum Puliyum" className="h-12 md:h-14 w-auto brightness-110" src="/lovable-uploads/82340129-92fe-4722-bb78-81fbc5c81b80.jpg" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <button 
                  key={link.name} 
                  onClick={() => handleNavClick(link)} 
                  className={`font-medium transition-colors ${isScrolled ? 'text-white/90 hover:text-white' : 'text-white/90 hover:text-white'}`} 
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Call Button */}
            <a href="tel:08951755121" className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all shadow-lg ${isScrolled ? 'bg-white text-green-700 hover:bg-gray-100' : 'bg-green-600 text-white hover:bg-green-700'}`} style={{
            fontFamily: "'Poppins', sans-serif"
          }}>
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">089517 55121</span>
            </a>
          </div>
        </div>
      </header>

      {/* Sub Header - Only visible on scroll */}
      <div className={`fixed left-0 right-0 z-40 bg-green-800 transition-all duration-500 ${isScrolled ? 'top-[60px] md:top-[68px] opacity-100' : 'top-0 opacity-0 pointer-events-none'}`}>
        <div className="container mx-auto px-4 py-2 flex justify-end items-center gap-4">
          <span className="text-white/80 text-sm hidden sm:inline" style={{
          fontFamily: "'Poppins', sans-serif"
        }}>
            Management & Staff:
          </span>
          <Link to="/auth" className="flex items-center gap-1.5 text-white text-sm hover:text-white/80 transition-colors" style={{
          fontFamily: "'Poppins', sans-serif"
        }}>
            <Settings className="w-4 h-4" />
            Admin
          </Link>
        </div>
      </div>
    </>;
};
export default Header;