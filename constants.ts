import { Category, Product } from './types';

export const PRODUCTS: Product[] = [
  // Anime Collection
  {
    id: 'a1',
    name: 'Naruto Shippuden - Akatsuki Cloud',
    price: 499,
    category: Category.ANIME,
    description: 'Matte black case with the iconic red Akatsuki cloud. Anti-slip grip.',
    imageUrl: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=400&q=80',
    isTrending: true,
    brandCompatibility: ['iPhone 13', 'iPhone 14', 'iPhone 15']
  },
  {
    id: 'a2',
    name: 'One Piece - Luffy Gear 5',
    price: 549,
    category: Category.ANIME,
    description: 'High-quality print of Luffy in Gear 5. Shock absorbent corners.',
    imageUrl: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80',
    isTrending: true,
    brandCompatibility: ['Samsung S23', 'Samsung S24', 'Pixel 7']
  },
  {
    id: 'a3',
    name: 'Gojo Satoru - Domain Expansion',
    price: 449,
    category: Category.ANIME,
    description: 'Jujutsu Kaisen limitless void design. Slim fit polycarbonate.',
    imageUrl: 'https://images.unsplash.com/photo-1628146937222-29e2402ea83d?auto=format&fit=crop&w=400&q=80',
    brandCompatibility: ['iPhone 15 Pro', 'OnePlus 11', 'Vivo V29']
  },
  
  // Marvel Collection
  {
    id: 'm1',
    name: 'Iron Man Mark 85',
    price: 599,
    category: Category.MARVEL,
    description: 'Premium metallic finish red and gold armor design.',
    imageUrl: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?auto=format&fit=crop&w=400&q=80',
    isTrending: true,
    brandCompatibility: ['iPhone 14 Pro', 'iPhone 15 Pro Max', 'Samsung S24 Ultra']
  },
  {
    id: 'm2',
    name: 'Spider-Man Classic Suit',
    price: 499,
    category: Category.MARVEL,
    description: 'Textured web pattern with raised eyes for camera protection.',
    imageUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=400&q=80',
    brandCompatibility: ['Redmi Note 13', 'Realme 12 Pro', 'iPhone 13']
  },

  // Glass
  {
    id: 'g1',
    name: 'Super Tough 11D Tempered Glass',
    price: 199,
    category: Category.GLASS,
    description: 'Edge-to-edge protection. 9H hardness, anti-fingerprint.',
    imageUrl: 'https://images.unsplash.com/photo-1629193166645-a75d502d997d?auto=format&fit=crop&w=400&q=80',
    brandCompatibility: ['All Models']
  },
  {
    id: 'g2',
    name: 'Matte Gaming Glass - Anti Glare',
    price: 249,
    category: Category.GLASS,
    description: 'Smooth matte finish for gaming. No reflections.',
    imageUrl: 'https://images.unsplash.com/photo-1592833159057-65a269f53e5e?auto=format&fit=crop&w=400&q=80',
    brandCompatibility: ['All Models']
  },

  // Pouches & Minimalist
  {
    id: 'p1',
    name: 'Transparent Shockproof Pouch',
    price: 149,
    category: Category.POUCHES,
    description: 'Crystal clear case with airbag corners. Does not turn yellow.',
    imageUrl: 'https://images.unsplash.com/photo-1541848156497-67cad3a2172d?auto=format&fit=crop&w=400&q=80',
    brandCompatibility: ['Universal']
  },
  {
    id: 'p2',
    name: 'Silicon Soft Case - Pastel',
    price: 299,
    category: Category.MINIMALIST,
    description: 'Silky soft-touch finish in pastel colors. Microfiber lining.',
    imageUrl: 'https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=400&q=80',
    brandCompatibility: ['iPhone', 'Samsung', 'Oppo', 'Vivo']
  }
];

export const MOCK_REVIEWS = [
  "The Gojo case looks insane on my iPhone!",
  "Best tempered glass for just 200rs. Saved my screen twice.",
  "Delivery was super fast to Bangalore.",
  "Love the Marvel collection. Quality is top notch for the price."
];