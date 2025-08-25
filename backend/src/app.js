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

// MCP Streamable endpoint for Copilot Studio Agent tools
// This implements the mcp-streamable-1.0 protocol for LLM-powered agents
app.post('/mcp', async (req, res) => {
  try {
    // Import the MCP server class
    const { TimeTravelersEmporiumMCPServer } = await import('./mcp/streamable-server.js');
    
    // Create server instance and handle the request
    const mcpServer = new TimeTravelersEmporiumMCPServer();
    const response = await mcpServer.handleStreamableRequest(req.body);
    
    res.json(response);
  } catch (error) {
    console.error('MCP Streamable error:', error);
    res.status(500).json({ 
      error: 'MCP Server Error', 
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
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
