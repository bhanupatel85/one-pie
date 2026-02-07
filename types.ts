export enum Category {
  ANIME = 'Anime',
  MARVEL = 'Marvel',
  MINIMALIST = 'Minimalist',
  GLASS = 'Tempered Glass',
  POUCHES = 'Pouches'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  imageUrl: string;
  isTrending?: boolean;
  brandCompatibility: string[]; // e.g., ['iPhone', 'Samsung']
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}