# Time Travelers' Emporium - Full Stack + MCP Demo

A comprehensive demonstration of how to add MCP (Model Context Protocol) capabilities to an existing e-commerce application, enabling AI agents to interact with your business data.

## 🏗️ Architecture

```
time-travelers-emporium/
├── frontend/          # React TypeScript app
├── backend/           # Node.js REST API + MCP Server
│   ├── src/
│   │   ├── routes/    # Express API routes
│   │   ├── services/  # Business logic
│   │   ├── data/      # Product data
│   │   └── mcp/       # MCP server implementation
│   └── package.json
├── shared/            # Shared types and utilities
└── package.json       # Workspace configuration
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Servers
```bash
# Start both frontend and backend
npm run dev

# Or start individually:
npm run dev:frontend  # Frontend on http://localhost:5173
npm run dev:backend   # Backend API on http://localhost:3001
```

### 3. Test the MCP Server
```bash
# Start MCP server (in separate terminal)
npm run dev:mcp

# Test MCP tools (example with Claude Desktop)
# Add to your claude_desktop_config.json:
{
  "mcpServers": {
    "time-travelers-emporium": {
      "command": "node",
      "args": ["C:/Projects/time-travelers-emporium/backend/src/mcp/server.js"],
      "env": {}
    }
  }
}
```

## 🎮 Demo Credentials

- **Username**: `launchuser`
- **Password**: `password`

## 🚀 Original Features (Frontend)

- **Authentication System**: Login with hardcoded credentials
- **Product Catalog**: Browse 20 unique temporal artifacts with filtering and sorting
- **Shopping Cart**: Add items to cart with persistent storage  
- **Toast Notification History**: Track and view all notifications with timestamps
- **Modern UI**: Clean, responsive design with dark/light theme toggle
- **Multiple Pages**: Home, Products, About Us, Contact Us, Cart, Checkout
- **Mock Functionality**: Contact form, forgot password, and checkout process

## 🔌 REST API Endpoints

### Products
- `GET /api/products` - List all products with filtering
- `GET /api/products/:id` - Get specific product
- `GET /api/products/meta/categories` - Get all categories
- `GET /api/products/meta/eras` - Get all historical eras
- `GET /api/products/meta/featured` - Get featured products
- `GET /api/products/meta/stats` - Get price statistics

### Cart
- `GET /api/cart` - Get cart contents
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update item quantity
- `DELETE /api/cart/remove/:productId` - Remove item
- `DELETE /api/cart/clear` - Clear entire cart

### Orders
- `POST /api/orders` - Create order from cart
- `GET /api/orders/:id` - Get specific order
- `GET /api/orders` - List all orders

## 🤖 MCP Server Capabilities

### Resources
- `emporium://products` - Complete product catalog
- `emporium://products/featured` - Featured products
- `emporium://products/categories` - Available categories
- `emporium://products/eras` - Historical eras
- `emporium://analytics/stats` - Store statistics

### Tools
- `search_products` - Search products by query, category, era
- `get_product_details` - Get detailed product information
- `filter_products_by_price` - Find products in price range
- `get_products_by_era` - Filter by historical era
- `add_to_cart` - Add products to shopping cart
- `get_cart_summary` - View current cart contents

## 💡 Demo Use Cases

### Customer Support Agent
```
"Show me all medieval weapons under $2000"
"What's the most expensive ancient artifact?"
"Add the Viking Battle Axe to my cart"
```

### Analytics Agent
```
"What's the average price of Renaissance era items?"
"Which category has the most products?"
"Show me the price distribution across all eras"
```

### Inventory Assistant
```
"List all featured products"
"Find products similar to the Leonardo da Vinci Sketch"
"What are our highest-priced items?"
```

## 🛠️ Technical Implementation

### MCP Server Features
- **Resources**: Direct access to product catalog and analytics
- **Tools**: Interactive operations for search, filtering, and cart management
- **Session Management**: Cart state preserved across interactions
- **Error Handling**: Graceful error responses for invalid operations

### REST API Features
- **Express.js**: Fast, unopinionated web framework
- **In-memory Storage**: Simple demo storage (easily replaceable with database)
- **CORS Enabled**: Ready for frontend integration
- **Session Support**: Cart persistence via session IDs

### Frontend Integration
- **Workspace Compatibility**: Shared types ensure consistency
- **Backward Compatible**: Existing frontend works unchanged
- **API Ready**: Can easily be modified to use REST API instead of local data

## 🎯 Business Value Demonstration

This setup demonstrates:

1. **Zero Disruption**: MCP layer added without changing existing application
2. **Rich Data Access**: AI agents can access all business data through structured tools
3. **Operational Efficiency**: Customer support, analytics, and inventory management via AI
4. **Scalable Architecture**: Easy to extend with new tools and resources
5. **Developer Friendly**: Standard REST API + MCP bridge pattern

## 🔧 Development Commands

```bash
# Install all dependencies
npm run install:all

# Development
npm run dev                 # Start both frontend and backend
npm run dev:frontend        # Frontend only
npm run dev:backend         # Backend API only
npm run dev:mcp            # MCP server only

# Building
npm run build              # Build both projects
npm run lint               # Lint all code
```

## 📊 Sample MCP Interactions

### Product Search
```json
{
  "tool": "search_products",
  "arguments": {
    "query": "tesla",
    "sortBy": "price-high"
  }
}
```

### Cart Management
```json
{
  "tool": "add_to_cart",
  "arguments": {
    "productId": "11",
    "quantity": 1,
    "sessionId": "demo-session"
  }
}
```

### Analytics Query
```json
{
  "tool": "filter_products_by_price",
  "arguments": {
    "minPrice": 1000,
    "maxPrice": 5000,
    "era": "renaissance"
  }
}
```

## 🛠️ Technologies Used

- **Frontend**: React 18 with TypeScript, Vite, React Router
- **Backend**: Node.js, Express.js, MCP SDK
- **Styling**: CSS Modules, Custom Properties for theming
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Development**: ESLint, Nodemon, Workspace management

---

*This project demonstrates how to enhance existing applications with MCP capabilities, enabling powerful AI-driven interactions while maintaining existing functionality.*
