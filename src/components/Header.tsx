import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Settings, Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

interface NavLink {
  name: string;
  href: string;
  isRoute?: boolean;
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
    name: 'Home',
    href: '/',
    isRoute: true
  }, {
    name: 'About',
    href: '#about'
  }, {
    name: 'Menu',
    href: '/menu',
    isRoute: true
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
    setIsOpen(false); // Close mobile menu
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

  const isActiveLink = (link: NavLink) => {
    if (link.isRoute) {
      return location.pathname === link.href;
    }
    return false;
  };

  return <>
      {/* Main Header - Transparent initially, solid on scroll */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-green-700 shadow-lg' : 'bg-gradient-to-b from-green-900/60 via-green-800/30 to-transparent'}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img alt="Erivum Puliyum" className="h-10 sm:h-12 md:h-14 w-auto brightness-110 mix-blend-multiply" src="/lovable-uploads/82340129-92fe-4722-bb78-81fbc5c81b80.jpg" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.filter(link => link.name !== 'Home').map(link => (
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

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Empty space where call button was */}
              <div className="hidden sm:block w-32 md:w-40" />

              {/* Mobile Hamburger Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button 
                    className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                    aria-label="Open menu"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-sm bg-background border-l border-border p-0">
                  <SheetHeader className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="font-display text-xl text-foreground">
                        Erivum Puliyum
                      </SheetTitle>
                    </div>
                  </SheetHeader>
                  
                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col p-4">
                    {navLinks.map(link => (
                      <button 
                        key={link.name} 
                        onClick={() => handleNavClick(link)} 
                        className={`text-left py-4 px-4 rounded-lg font-medium text-lg transition-all ${
                          isActiveLink(link) 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-foreground hover:bg-muted'
                        }`} 
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {link.name}
                      </button>
                    ))}
                  </nav>

                  {/* Mobile Call Button */}
                  <div className="p-4 mt-auto border-t border-border">
                    <a 
                      href="tel:08951755121" 
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      <Phone className="w-5 h-5" />
                      <span>Call Now: 089517 55121</span>
                    </a>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Sub Header - Only visible on scroll */}
      <div className={`fixed left-0 right-0 z-40 bg-green-800 transition-all duration-500 ${isScrolled ? 'top-[56px] sm:top-[60px] md:top-[68px] opacity-100' : 'top-0 opacity-0 pointer-events-none'}`}>
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