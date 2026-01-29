// Menu data with dish images
import fishCurry from '@/assets/dishes/fish-curry.jpg';
import beefFry from '@/assets/dishes/beef-fry.jpg';
import chickenRoast from '@/assets/dishes/chicken-roast.jpg';
import appamStew from '@/assets/dishes/appam-stew.jpg';
import parottaBeef from '@/assets/dishes/parotta-beef.jpg';
import prawnsFry from '@/assets/dishes/prawns-fry.jpg';
import puttuKadala from '@/assets/dishes/puttu-kadala.jpg';
import biryani from '@/assets/dishes/biryani.jpg';
import sambar from '@/assets/dishes/sambar.jpg';
import payasam from '@/assets/dishes/payasam.jpg';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  spiceLevel: 'Mild' | 'Medium' | 'Spicy';
  image: string;
  category: string;
  isBestSeller?: boolean;
}

export const menuItems: MenuItem[] = [
  // Non-Veg Starters & Mains
  {
    id: '1',
    name: 'Kerala Fish Curry',
    description: 'Traditional red fish curry cooked in clay pot with coconut, kokum, and aromatic Kerala spices. A coastal delicacy.',
    spiceLevel: 'Medium',
    image: fishCurry,
    category: 'Seafood',
    isBestSeller: true,
  },
  {
    id: '2',
    name: 'Kerala Beef Fry',
    description: 'Succulent beef pieces slow-cooked with coconut slices, curry leaves, and traditional Malabar spices until crispy perfection.',
    spiceLevel: 'Spicy',
    image: beefFry,
    category: 'Non-Veg',
    isBestSeller: true,
  },
  {
    id: '3',
    name: 'Nadan Chicken Roast',
    description: 'Country-style chicken roasted with shallots, black pepper, and fresh curry leaves. A Kerala household favourite.',
    spiceLevel: 'Medium',
    image: chickenRoast,
    category: 'Non-Veg',
    isBestSeller: true,
  },
  {
    id: '4',
    name: 'Prawns Fry',
    description: 'Jumbo tiger prawns marinated in Kerala spices and pan-fried with coconut oil and curry leaves.',
    spiceLevel: 'Spicy',
    image: prawnsFry,
    category: 'Seafood',
  },
  {
    id: '5',
    name: 'Kerala Parotta with Beef Curry',
    description: 'Flaky, layered Kerala parotta served with rich and spicy beef curry. A street food legend.',
    spiceLevel: 'Spicy',
    image: parottaBeef,
    category: 'Non-Veg',
    isBestSeller: true,
  },
  {
    id: '6',
    name: 'Malabar Chicken Biryani',
    description: 'Fragrant basmati rice layered with tender chicken, caramelized onions, and Malabar spice blend.',
    spiceLevel: 'Medium',
    image: biryani,
    category: 'Rice',
  },

  // Breakfast Specials
  {
    id: '7',
    name: 'Appam with Vegetable Stew',
    description: 'Lacy fermented rice hoppers paired with creamy coconut milk vegetable stew. A Syrian Christian breakfast.',
    spiceLevel: 'Mild',
    image: appamStew,
    category: 'Breakfast',
  },
  {
    id: '8',
    name: 'Puttu & Kadala Curry',
    description: 'Steamed rice cake cylinders served with spiced black chickpea curry and ripe banana.',
    spiceLevel: 'Medium',
    image: puttuKadala,
    category: 'Breakfast',
    isBestSeller: true,
  },

  // Vegetarian
  {
    id: '9',
    name: 'Kerala Sambar',
    description: 'Hearty lentil stew with drumsticks, vegetables, and tangy tamarind. Comfort in every spoon.',
    spiceLevel: 'Medium',
    image: sambar,
    category: 'Vegetarian',
  },

  // Desserts
  {
    id: '10',
    name: 'Palada Payasam',
    description: 'Creamy rice flakes dessert cooked in rich milk with cardamom, cashews, and raisins.',
    spiceLevel: 'Mild',
    image: payasam,
    category: 'Desserts',
  },
];

export const categories = [
  'All',
  'Non-Veg',
  'Seafood',
  'Rice',
  'Breakfast',
  'Vegetarian',
  'Desserts',
];
