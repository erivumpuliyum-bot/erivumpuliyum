import { ArrowRight, Utensils } from 'lucide-react';
import keralaMeals from '@/assets/dishes/kerala-meals.jpg';
import chickenRoast from '@/assets/dishes/chicken-roast.jpg';
import fishCurry from '@/assets/dishes/fish-curry.jpg';
import malabarParotta from '@/assets/dishes/malabar-parotta.jpg';

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
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="menu" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">👨‍🍳</span>
          <h2 className="font-display text-4xl md:text-5xl text-gray-900 mb-4">From Our Kitchen</h2>
          <p className="text-gray-600 text-lg">Discover our most beloved dishes, crafted with love and tradition</p>
          <div className="w-20 h-1 bg-red-500 mx-auto mt-4" />
        </div>

        {/* Dishes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {featuredDishes.map((dish, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl text-gray-900 mb-2">{dish.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{dish.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {dish.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2 py-1 rounded-full ${dish.tagStyle}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="text-green-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Know More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu Button */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Want to explore more delicious options?</p>
          <a
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all shadow-lg"
          >
            <Utensils className="w-5 h-5" />
            View Full Menu
          </a>
        </div>
      </div>
    </section>
  );
};

export default Menu;
