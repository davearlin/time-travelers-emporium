import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CartService } from '../services/cartService.js';

const router = express.Router();

// In-memory order storage (in production, use database)
const orders = new Map();

// POST /api/orders - Create new order from cart
router.post('/', (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'] || req.body.sessionId || 'default-session';
    const { customerInfo } = req.body;
    
    const cart = CartService.getCartSummary(sessionId);
    
    if (cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    
    const orderId = uuidv4();
    const order = {
      id: orderId,
      customerInfo,
      items: cart.items,
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice,
      status: 'confirmed',
      orderDate: new Date(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    };
    
    orders.set(orderId, order);
    
    // Clear the cart after successful order
    CartService.clearCart(sessionId);
    
    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/orders/:id - Get specific order
router.get('/:id', (req, res) => {
  try {
    const order = orders.get(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/orders - Get all orders (for demo purposes)
router.get('/', (req, res) => {
  try {
    const allOrders = Array.from(orders.values());
    res.json(allOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router as ordersRouter };
