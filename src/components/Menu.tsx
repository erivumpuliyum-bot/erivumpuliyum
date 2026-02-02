import { ArrowRight, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import keralaMeals from '@/assets/dishes/kerala-meals.jpg';
import chickenRoast from '@/assets/dishes/chicken-roast.jpg';
import fishCurry from '@/assets/dishes/fish-curry.jpg';
import malabarParotta from '@/assets/dishes/malabar-parotta.jpg';
import { AnimatedSection } from '@/components/ui/animated-section';

const featuredDishes = [
  {
    name: 'Kerala Special Meals',
    description: 'A wholesome traditional meal served with rice, sambar, rasam, avial, thoran,...',
    image: keralaMeals,
    tags: ['First-time visitors & lunch lovers'],
    tagStyle: 'bg-green-100 text-green-700',
  },
  {
    name: 'Kerala Chicken Curry',
    description: 'Slow-cooked chicken in a coconut-rich gravy with roasted spices and curry...',
    image: chickenRoast,
    tags: ['Spicy', 'Aromatic', 'Comforting'],
    tagStyle: 'bg-orange-400 text-white',
  },
  {
    name: 'Fish Curry (Kudampuli Style)',
    description: 'A classic Kerala fish curry made with tamarind (kudampuli), coconut oil, and...',
    image: fishCurry,
    tags: ['Tangy', 'Bold', 'Traditional'],
    tagStyle: 'bg-red-500 text-white',
  },
  {
    name: 'Malabar Parotta',
    description: 'Layered flatbread, soft inside and crispy outside, perfect with curries.',
    image: malabarParotta,
    tags: ['Pairs with: Chicken or Beef Fry'],
    tagStyle: 'bg-gray-100 text-gray-700',
  },
];

const Menu = () => {
  return (
    <section id="menu" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection animation="fade-up" className="text-center mb-12">
          <span className="text-4xl mb-4 block animate-float">👨‍🍳</span>
          <h2 className="font-display text-4xl md:text-5xl text-gray-900 mb-4">From Our Kitchen</h2>
          <p className="text-gray-600 text-lg">Discover our most beloved dishes, crafted with love and tradition</p>
          <div className="w-20 h-1 bg-red-500 mx-auto mt-4" />
        </AnimatedSection>

        {/* Dishes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {featuredDishes.map((dish, index) => (
            <AnimatedSection 
              key={index} 
              animation="fade-up" 
              delay={index * 100}
            >
              <div className="group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl text-gray-900 mb-2 transition-colors group-hover:text-green-600">{dish.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{dish.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {dish.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`text-xs px-2 py-1 rounded-full transition-transform duration-300 group-hover:scale-105 ${dish.tagStyle}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="text-green-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all group/btn">
                    Know More <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* View Full Menu Button */}
        <AnimatedSection animation="fade-up" delay={500} className="text-center mt-12">
          <p className="text-gray-600 mb-4">Want to explore more delicious options?</p>
          <Link
            to="/menu"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <Utensils className="w-5 h-5 transition-transform group-hover:rotate-12" />
            View Full Menu
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Menu;
