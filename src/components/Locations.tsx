import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

const locations = [
  {
    id: 1,
    name: 'Marathahalli',
    address: '560, AECS Layout Main Road, AECS Layout – A Block, Marathahalli, Bengaluru, Karnataka – 560037',
    phone: '+91 90082 38101',
    hours: '11:30 AM – 11:00 PM',
    daysOpen: 'Monday – Sunday',
    mapsUrl: 'https://maps.google.com/?q=Erivum+Puliyum+Marathahalli+Bangalore',
  },
  {
    id: 2,
    name: 'Bellandur',
    address: 'Ground Floor, No. 6 & 7, Ambalipura – Sarjapur Road, Behind Louis Philippe Showroom, Bellandur, Bengaluru, Karnataka – 560102',
    phone: '089517 55121',
    hours: '11:30 AM – 11:00 PM',
    daysOpen: 'Monday – Sunday',
    mapsUrl: 'https://maps.google.com/?q=Erivum+Puliyum+Bellandur+Bangalore',
  },
];

const Locations = () => {
  return (
    <section id="locations" className="section-padding bg-muted/30">
      <div className="container-custom mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-secondary font-medium text-lg mb-2">Visit Us</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-primary">Locations</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find us at two convenient locations in Bangalore
          </p>
        </div>

        {/* Location Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {locations.map((location) => (
            <div
              key={location.id}
              className="card-kerala p-6 md:p-8 hover:shadow-xl transition-all duration-300"
            >
              {/* Location Name */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {location.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">EP Kitchen</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 mb-6">
                {/* Address */}
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">{location.address}</p>
                </div>

                {/* Phone */}
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                  <a
                    href={`tel:${location.phone.replace(/\s/g, '')}`}
                    className="text-foreground font-medium hover:text-primary transition-colors"
                  >
                    {location.phone}
                  </a>
                </div>

                {/* Hours */}
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-secondary flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">{location.hours}</p>
                    <p className="text-sm text-muted-foreground">{location.daysOpen}</p>
                  </div>
                </div>
              </div>

              {/* Map Button */}
              <a
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
              >
                View on Google Maps
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
