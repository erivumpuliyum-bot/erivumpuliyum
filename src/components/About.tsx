import galleryInterior from '@/assets/gallery/restaurant-interior.jpg';

const About = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-custom mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={galleryInterior}
                alt="Erivum Puliyum Restaurant Interior"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground px-6 py-4 rounded-xl shadow-xl">
              <p className="text-sm font-medium opacity-80">Serving Since</p>
              <p className="text-2xl font-display font-bold">2018</p>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <p className="text-secondary font-medium text-lg mb-2">Our Story</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              A Taste of{' '}
              <span className="text-primary">Kerala</span>{' '}
              in the Heart of Bangalore
            </h2>
            
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                <strong className="text-foreground">Erivum Puliyum</strong> — the name itself translates to "Spice and Tamarind," the soul of authentic Kerala cooking. We bring the rich culinary heritage of God's Own Country to your table in Bangalore.
              </p>
              <p>
                Every dish at EP Kitchen tells a story of tradition passed down through generations. From the fiery Kerala beef fry to the soothing coconut-infused fish curry, each recipe is crafted with handpicked spices, fresh coconut, and the love that only a true Kerala kitchen can offer.
              </p>
              <p>
                Our mission is simple: to serve you the same homely, aromatic meals you'd find in a traditional Kerala home — with the warmth of family and the richness of authentic flavours.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-card rounded-xl">
                <p className="text-3xl font-display font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground">Authentic Recipes</p>
              </div>
              <div className="text-center p-4 bg-card rounded-xl">
                <p className="text-3xl font-display font-bold text-secondary">50+</p>
                <p className="text-sm text-muted-foreground">Signature Dishes</p>
              </div>
              <div className="text-center p-4 bg-card rounded-xl">
                <p className="text-3xl font-display font-bold text-accent">2</p>
                <p className="text-sm text-muted-foreground">Locations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
