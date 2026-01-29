import { useState } from 'react';
import restaurantInterior from '@/assets/gallery/restaurant-interior.jpg';
import sadyaFeast from '@/assets/gallery/sadya-feast.jpg';
import cookingScene from '@/assets/gallery/cooking-scene.jpg';
import fishCurry from '@/assets/dishes/fish-curry.jpg';
import beefFry from '@/assets/dishes/beef-fry.jpg';
import biryani from '@/assets/dishes/biryani.jpg';
import keralaMeals from '@/assets/dishes/kerala-meals.jpg';
import chickenRoast from '@/assets/dishes/chicken-roast.jpg';
import { X } from 'lucide-react';

const galleryImages = [
  { src: restaurantInterior, alt: 'Restaurant Interior', category: 'Ambience' },
  { src: sadyaFeast, alt: 'Kerala Sadya Feast', category: 'Food' },
  { src: fishCurry, alt: 'Kerala Fish Curry', category: 'Food' },
  { src: cookingScene, alt: 'Traditional Cooking', category: 'Kitchen' },
  { src: beefFry, alt: 'Kerala Beef Fry', category: 'Food' },
  { src: biryani, alt: 'Malabar Biryani', category: 'Food' },
  { src: keralaMeals, alt: 'Kerala Special Meals', category: 'Food' },
  { src: chickenRoast, alt: 'Nadan Chicken Roast', category: 'Food' },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-gray-900 mb-4">
            Our <span className="text-green-600">Gallery</span>
          </h2>
          <p className="text-gray-600 text-lg">A glimpse into the flavours and ambience of EP Kitchen</p>
          <div className="w-20 h-1 bg-red-500 mx-auto mt-4" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image.src)}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                  index === 0 ? 'h-64 md:h-full' : 'h-40 md:h-48'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full">
                  {image.category}
                </span>
                <p className="text-white font-medium mt-1">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery Image"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
