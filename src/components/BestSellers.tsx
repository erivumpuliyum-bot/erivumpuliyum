import { menuItems } from '@/data/menuData';
import { Star } from 'lucide-react';

const BestSellers = () => {
  const bestSellers = menuItems.filter(item => item.isBestSeller);

  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full mb-4">
            <Star className="w-5 h-5 text-secondary fill-secondary" />
            <span className="font-medium">Customer Favourites</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="text-secondary">Best Sellers</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            The dishes that keep our guests coming back for more
          </p>
        </div>

        {/* Best Sellers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSellers.map((item) => (
            <div
              key={item.id}
              className="group bg-primary-foreground/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-primary-foreground/15 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    item.spiceLevel === 'Mild' ? 'bg-green-500/80 text-white' :
                    item.spiceLevel === 'Medium' ? 'bg-yellow-500/80 text-white' :
                    'bg-red-500/80 text-white'
                  }`}>
                    {item.spiceLevel}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-primary-foreground/70 text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
