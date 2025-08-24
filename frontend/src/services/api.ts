// API service for connecting to backend
import type { Product } from '../../../shared';
// Local fallback dataset re-exported from shared
import { products as localProducts } from '../data/products';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) || 'http://localhost:3001';

export interface ApiCartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
  const data = await response.json();
  // Backend may return either an array or an object with { products, ... }
  if (Array.isArray(data)) return data as Product[];
  if (data && Array.isArray(data.products)) return data.products as Product[];
  console.warn('Unexpected products response shape:', data);
  return [] as Product[];
    } catch (error) {
      console.warn('API not available, using local data:', error);
  // Fallback to local dataset bundled with the app
  return Array.isArray(localProducts) ? (localProducts as Product[]) : ([] as Product[]);
    }
  }

  async getProduct(id: string): Promise<Product | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/products/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return await response.json();
    } catch (error) {
      console.warn('API not available, returning null product:', error);
      return null;
    }
  }

  async addToCart(productId: string, quantity: number = 1): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity })
      });
      
      if (!response.ok) throw new Error('Failed to add to cart');
      return await response.json();
    } catch (error) {
      console.warn('API not available for cart operations:', error);
      return { success: true }; // Fallback to local cart management
    }
  }

  async getCart(): Promise<ApiCartItem[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/cart`);
      if (!response.ok) throw new Error('Failed to fetch cart');
      return await response.json();
    } catch (error) {
      console.warn('API not available for cart operations:', error);
      return []; // Fallback to local cart management
    }
  }

  async createOrder(order: any): Promise<{ success: boolean; orderId?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      
      if (!response.ok) throw new Error('Failed to create order');
      return await response.json();
    } catch (error) {
      console.warn('API not available for order creation:', error);
      return { success: true, orderId: `local-${Date.now()}` };
    }
  }

  // Health check to see if backend is available
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

export const apiService = new ApiService();
export default apiService;
