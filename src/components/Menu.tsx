import { useState } from 'react';
import { menuItems, categories, MenuItem } from '@/data/menuData';
import { Flame } from 'lucide-react';

const SpiceBadge = ({ level }: { level: MenuItem['spiceLevel'] }) => {
  const styles = {
    Mild: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Spicy: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${styles[level]}`}>
      <Flame className="w-3 h-3" />
      {level}
    </span>
  );
};

const MenuCard = ({ item }: { item: MenuItem }) => (
  <div className="card-kerala overflow-hidden group hover:shadow-xl transition-all duration-300">
    <div className="flex flex-col md:flex-row">
      {/* Image */}
      <div className="md:w-48 md:h-48 h-48 flex-shrink-0 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <p className="text-sm text-secondary font-medium">{item.category}</p>
          </div>
          <SpiceBadge level={item.spiceLevel} />
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {item.description}
        </p>
        {item.isBestSeller && (
          <span className="inline-block mt-3 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
            ★ Best Seller
          </span>
        )}
      </div>
    </div>
  </div>
);

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="section-padding bg-muted/30">
      <div className="container-custom mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-secondary font-medium text-lg mb-2">Our Menu</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Authentic <span className="text-primary">Kerala</span> Flavours
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Each dish is prepared with love, using traditional recipes and the freshest ingredients.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card text-foreground hover:bg-primary/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
