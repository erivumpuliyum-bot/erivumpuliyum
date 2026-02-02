import { Star, Quote } from 'lucide-react';
import { AnimatedSection, StaggeredContainer } from '@/components/ui/animated-section';

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
    text: 'I\'ve tried many Kerala restaurants in Bangalore, but Erivum Puliyum stands out. The prawn roast is crispy, spicy, and absolutely divine. The ambience reminds me of home. Highly recommended!',
    avatar: 'PN',
  },
  {
    id: 3,
    name: 'Rajesh Kumar',
    location: 'HSR Layout, Bangalore',
    rating: 5,
    text: 'The Malabar parotta with chicken curry is to die for! Soft, flaky parottas paired with rich, aromatic curry. Every bite feels like a celebration of Kerala\'s culinary heritage.',
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
    <section id="testimonials" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection animation="fade-up" className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-gray-900 mb-4">
            What Our <span className="text-green-600">Guests</span> Say
          </h2>
          <p className="text-gray-600 text-lg">Real stories from our beloved customers</p>
          <div className="w-20 h-1 bg-red-500 mx-auto mt-4" />
        </AnimatedSection>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection 
              key={testimonial.id} 
              animation="fade-up" 
              delay={index * 150}
            >
              <div className="group bg-white rounded-2xl p-6 shadow-lg relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 card-hover">
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 w-8 h-8 text-green-100 transition-transform duration-300 group-hover:scale-110 group-hover:text-green-200" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 text-yellow-400 fill-yellow-400 transition-transform duration-300"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold transition-all duration-300 group-hover:scale-110 group-hover:bg-green-700">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
