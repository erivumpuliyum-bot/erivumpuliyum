import { MapPin, Phone, Clock, ExternalLink, Leaf } from 'lucide-react';

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
  return (
    <section id="locations" className="py-20 bg-gradient-to-b from-green-600 to-green-700">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">📍</span>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">Our Locations</h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Visit us at either of our two locations in Bengaluru for an authentic Kerala dining experience.
          </p>
        </div>

        {/* Location Cards */}
        <div className="space-y-12 max-w-6xl mx-auto">
          {locations.map((location) => (
            <div key={location.id}>
              {/* Branch Title */}
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-yellow-300" />
                <h3 className="text-white text-xl font-semibold italic">{location.branch}</h3>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Left - Info Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-white text-2xl font-display">{location.name}</h4>
                  </div>

                  <div className="bg-white/10 rounded-xl p-5 mb-4">
                    <p className="text-white font-semibold mb-2">{location.restaurant}</p>
                    {location.address.map((line, i) => (
                      <p key={i} className="text-white/80 text-sm">{line}</p>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/30 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <a href={`tel:${location.phone.replace(/\s/g, '')}`} className="text-white font-medium">
                        {location.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500/30 rounded-full flex items-center justify-center">
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
                    className="flex items-center justify-center gap-2 w-full py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on Google Maps
                  </a>
                </div>

                {/* Right - Map */}
                <div className="rounded-2xl overflow-hidden shadow-xl bg-white h-80 lg:h-auto">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location.restaurant + ' ' + location.name + ' Bangalore')}&zoom=15`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '300px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map - ${location.name}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          <div className="flex items-center gap-2 px-5 py-3 bg-white/10 rounded-full text-white">
            <span>🍲</span>
            <span>Authentic Kerala Cuisine</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-3 bg-green-800/50 rounded-full text-white">
            <span>🥥</span>
            <span>Traditional Recipes</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-3 bg-green-800/50 rounded-full text-white">
            <span>🌿</span>
            <span>Fresh Ingredients</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
