import { Phone, MapPin, Clock } from 'lucide-react';
import epLogo from '@/assets/ep-logo-full.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-wood-brown text-primary-foreground">
      <div className="container-custom mx-auto section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src={epLogo}
              alt="Erivum Puliyum"
              className="h-16 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Authentic Kerala cuisine crafted with traditional spices, slow cooking, and homely warmth. Experience the taste of God's Own Country in Bangalore.
            </p>
          </div>

          {/* Marathahalli */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" />
              Marathahalli
            </h4>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <p>560, AECS Layout Main Road, AECS Layout – A Block, Marathahalli, Bengaluru – 560037</p>
              <a
                href="tel:+919008238101"
                className="flex items-center gap-2 hover:text-secondary transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 90082 38101
              </a>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                11:30 AM – 11:00 PM
              </p>
            </div>
          </div>

          {/* Bellandur */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" />
              Bellandur
            </h4>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <p>Ground Floor, No. 6 & 7, Ambalipura – Sarjapur Road, Behind Louis Philippe Showroom, Bellandur, Bengaluru – 560102</p>
              <a
                href="tel:08951755121"
                className="flex items-center gap-2 hover:text-secondary transition-colors"
              >
                <Phone className="w-4 h-4" />
                089517 55121
              </a>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                11:30 AM – 11:00 PM
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <a href="#about" className="hover:text-secondary transition-colors">About Us</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-secondary transition-colors">Our Menu</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-secondary transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#locations" className="hover:text-secondary transition-colors">Locations</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-secondary transition-colors">Reviews</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© {currentYear} Erivum Puliyum Restaurant (EP Kitchen). All rights reserved.</p>
          <p className="mt-2">Made with ❤️ for Kerala food lovers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
