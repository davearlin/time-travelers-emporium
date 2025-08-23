import express from 'express';
import { ProductService } from '../services/productService.js';

const router = express.Router();

// GET /api/products - Get all products with optional filtering and sorting
router.get('/', (req, res) => {
  try {
    const { category, era, search, sortBy } = req.query;
    
    let products = ProductService.getAllProducts();
    
    // Apply filters
    if (category && category !== 'all') {
      products = ProductService.getProductsByCategory(category);
    }
    
    if (era && era !== 'all') {
      products = ProductService.getProductsByEra(era);
    }
    
    if (search) {
      products = ProductService.searchProducts(search);
    }
    
    // Apply sorting
    if (sortBy) {
      products = ProductService.sortProducts(products, sortBy);
    }
    
    res.json({
      products,
      count: products.length,
      filters: {
        category: category || 'all',
        era: era || 'all',
        search: search || '',
        sortBy: sortBy || 'name'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/:id - Get specific product
router.get('/:id', (req, res) => {
  try {
    const product = ProductService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/meta/categories - Get all categories
router.get('/meta/categories', (req, res) => {
  try {
    const categories = ProductService.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/meta/eras - Get all eras
router.get('/meta/eras', (req, res) => {
  try {
    const eras = ProductService.getEras();
    res.json(eras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/meta/featured - Get featured products
router.get('/meta/featured', (req, res) => {
  try {
    const featured = ProductService.getFeaturedProducts();
    res.json(featured);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/meta/stats - Get price statistics
router.get('/meta/stats', (req, res) => {
  try {
    const priceRange = ProductService.getPriceRange();
    const categories = ProductService.getCategories();
    const eras = ProductService.getEras();
    
    res.json({
      priceRange,
      categoriesCount: categories.length,
      erasCount: eras.length,
      totalProducts: ProductService.getAllProducts().length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router as productsRouter };
