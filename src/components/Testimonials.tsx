import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Arun Menon',
    location: 'Marathahalli, Bangalore',
    rating: 5,
    text: 'The Kerala fish curry here is exactly like what my ammachi used to make back in Kochi. Absolutely authentic and bursting with flavours. EP Kitchen has become our family\'s go-to place for homely Kerala food!',
    avatar: 'AM',
  },
  {
    id: 2,
    name: 'Priya Nair',
    location: 'Bellandur, Bangalore',
    rating: 5,
    text: 'I\'ve tried many Kerala restaurants in Bangalore, but Erivum Puliyum stands out. The beef fry is crispy, spicy, and absolutely divine. The ambience reminds me of home. Highly recommended!',
    avatar: 'PN',
  },
  {
    id: 3,
    name: 'Rajesh Kumar',
    location: 'HSR Layout, Bangalore',
    rating: 5,
    text: 'The Malabar parotta with beef curry is to die for! Soft, flaky parottas paired with rich, aromatic curry. Every bite feels like a celebration of Kerala\'s culinary heritage.',
    avatar: 'RK',
  },
  {
    id: 4,
    name: 'Deepa Thomas',
    location: 'Whitefield, Bangalore',
    rating: 5,
    text: 'Finally found a place that serves authentic appam and stew in Bangalore! The coconut milk stew is creamy and comforting. Perfect for a Sunday breakfast with family.',
    avatar: 'DT',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-background">
      <div className="container-custom mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-secondary font-medium text-lg mb-2">Testimonials</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our <span className="text-primary">Guests</span> Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from our beloved customers
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="card-kerala p-6 relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-secondary fill-secondary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
