export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  era: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type SortOption = 'name' | 'price-low' | 'price-high' | 'era';
export type FilterOption = 'all' | 'ancient' | 'medieval' | 'renaissance' | 'modern' | 'future';
