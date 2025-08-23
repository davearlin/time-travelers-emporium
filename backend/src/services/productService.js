import { products } from '../data/products.js';

export class ProductService {
  static getAllProducts() {
    return products;
  }

  static getProductById(id) {
    return products.find(product => product.id === id);
  }

  static getProductsByCategory(category) {
    if (category === 'all') return products;
    return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
  }

  static getProductsByEra(era) {
    if (era === 'all') return products;
    return products.filter(product => product.era.toLowerCase() === era.toLowerCase());
  }

  static searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.era.toLowerCase().includes(searchTerm)
    );
  }

  static sortProducts(products, sortBy) {
    switch (sortBy) {
      case 'name':
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price);
      case 'era':
        return [...products].sort((a, b) => a.era.localeCompare(b.era));
      default:
        return products;
    }
  }

  static getCategories() {
    const categories = [...new Set(products.map(p => p.category))];
    return categories.sort();
  }

  static getEras() {
    const eras = [...new Set(products.map(p => p.era))];
    return eras.sort();
  }

  static getFeaturedProducts() {
    return products.filter(product => product.featured);
  }

  static getPriceRange() {
    const prices = products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      average: prices.reduce((sum, price) => sum + price, 0) / prices.length
    };
  }
}
