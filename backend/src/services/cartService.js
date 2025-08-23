import { v4 as uuidv4 } from 'uuid';
import { ProductService } from './productService.js';

// In-memory cart storage (in production, use Redis or database)
const carts = new Map();

export class CartService {
  static getOrCreateCart(sessionId) {
    if (!carts.has(sessionId)) {
      carts.set(sessionId, {
        id: sessionId,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return carts.get(sessionId);
  }

  static addToCart(sessionId, productId, quantity = 1) {
    const cart = this.getOrCreateCart(sessionId);
    const product = ProductService.getProductById(productId);
    
    if (!product) {
      throw new Error('Product not found');
    }

    const existingItem = cart.items.find(item => item.product.id === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product,
        quantity
      });
    }

    cart.updatedAt = new Date();
    return cart;
  }

  static removeFromCart(sessionId, productId) {
    const cart = this.getOrCreateCart(sessionId);
    cart.items = cart.items.filter(item => item.product.id !== productId);
    cart.updatedAt = new Date();
    return cart;
  }

  static updateQuantity(sessionId, productId, quantity) {
    if (quantity <= 0) {
      return this.removeFromCart(sessionId, productId);
    }

    const cart = this.getOrCreateCart(sessionId);
    const item = cart.items.find(item => item.product.id === productId);
    
    if (item) {
      item.quantity = quantity;
      cart.updatedAt = new Date();
    }
    
    return cart;
  }

  static clearCart(sessionId) {
    const cart = this.getOrCreateCart(sessionId);
    cart.items = [];
    cart.updatedAt = new Date();
    return cart;
  }

  static getCartSummary(sessionId) {
    const cart = this.getOrCreateCart(sessionId);
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    return {
      ...cart,
      totalItems,
      totalPrice,
      itemCount: cart.items.length
    };
  }
}
