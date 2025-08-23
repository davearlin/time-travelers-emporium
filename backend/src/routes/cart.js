import express from 'express';
import { CartService } from '../services/cartService.js';

const router = express.Router();

// Middleware to get or create session ID
const getSessionId = (req, res, next) => {
  req.sessionId = req.headers['x-session-id'] || req.query.sessionId || 'default-session';
  next();
};

router.use(getSessionId);

// GET /api/cart - Get cart contents
router.get('/', (req, res) => {
  try {
    const cart = CartService.getCartSummary(req.sessionId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/cart/add - Add item to cart
router.post('/add', (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
    
    const cart = CartService.addToCart(req.sessionId, productId, quantity);
    const summary = CartService.getCartSummary(req.sessionId);
    
    res.json({
      message: 'Item added to cart',
      cart: summary
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/cart/remove/:productId - Remove item from cart
router.delete('/remove/:productId', (req, res) => {
  try {
    const cart = CartService.removeFromCart(req.sessionId, req.params.productId);
    const summary = CartService.getCartSummary(req.sessionId);
    
    res.json({
      message: 'Item removed from cart',
      cart: summary
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/cart/update - Update item quantity
router.put('/update', (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    if (!productId || quantity === undefined) {
      return res.status(400).json({ error: 'Product ID and quantity are required' });
    }
    
    const cart = CartService.updateQuantity(req.sessionId, productId, quantity);
    const summary = CartService.getCartSummary(req.sessionId);
    
    res.json({
      message: 'Cart updated',
      cart: summary
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/cart/clear - Clear entire cart
router.delete('/clear', (req, res) => {
  try {
    const cart = CartService.clearCart(req.sessionId);
    const summary = CartService.getCartSummary(req.sessionId);
    
    res.json({
      message: 'Cart cleared',
      cart: summary
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router as cartRouter };
