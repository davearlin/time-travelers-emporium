import express from 'express';
import cors from 'cors';
import { productsRouter } from './routes/products.js';
import { cartRouter } from './routes/cart.js';
import { ordersRouter } from './routes/orders.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);

// MCP placeholder endpoint for Copilot Studio custom connector validation
// Note: The actual MCP server runs over stdio. This route is a no-op 200 OK so
// the OpenAPI-based connector can be created and pointed at a reachable URL.
app.post('/mcp', (req, res) => {
  res.status(200).json({ ok: true, note: 'MCP stdio server available only locally; this HTTP endpoint is a placeholder for connector setup.' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Time Travelers' Emporium API running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});
