import spicesImage from '@/assets/spices-image.jpg';
import chefCooking from '@/assets/chef-cooking.jpg';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-gray-900 mb-2">Our Story</h2>
          <div className="w-20 h-1 bg-red-500 mx-auto" />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left - Text */}
          <div className="bg-gray-50 rounded-3xl p-8 md:p-10 shadow-lg">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              At <span className="text-green-600 font-semibold">Erivum Puliyum Restaurant</span>, we bring the true taste of Kerala to Bangalore. Inspired by age-old family recipes, our dishes are cooked using freshly ground spices, coconut-based gravies, and traditional techniques passed down through generations.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              From hearty Kerala meals served on banana leaves to rich seafood curries infused with kudampuli, every dish reflects the soul of <span className="text-green-600 font-semibold italic">God's Own Country</span>.
            </p>
          </div>

          {/* Right - Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src={spicesImage}
                alt="Authentic Spices"
                className="w-full h-48 object-cover rounded-2xl shadow-lg"
              />
              <div className="bg-red-500 rounded-2xl p-6 text-center text-white">
                <span className="text-3xl mb-2 block">🍲</span>
                <p className="font-semibold">Made with Love</p>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="bg-green-600 rounded-2xl p-6 text-center text-white">
                <span className="text-3xl mb-2 block">🌶️</span>
                <p className="font-semibold">Authentic Spices</p>
              </div>
              <img
                src={chefCooking}
                alt="Chef Cooking"
                className="w-full h-48 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mt-16 max-w-3xl mx-auto">
          <div className="bg-gray-50 rounded-2xl px-10 py-6 text-center shadow-md">
            <p className="font-display text-4xl text-red-500 mb-1">8<sup>+</sup></p>
            <p className="text-gray-600 text-sm">Years of Tradition</p>
          </div>
          <div className="bg-gray-50 rounded-2xl px-10 py-6 text-center shadow-md">
            <p className="font-display text-4xl text-green-600 mb-1">100<sup>+</sup></p>
            <p className="text-gray-600 text-sm">Authentic Dishes</p>
          </div>
          <div className="bg-gray-50 rounded-2xl px-10 py-6 text-center shadow-md">
            <p className="font-display text-4xl text-orange-500 mb-1">5L<sup>+</sup></p>
            <p className="text-gray-600 text-sm">Happy Guests</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
