#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { ProductService } from '../services/productService.js';
import { CartService } from '../services/cartService.js';

class TimeTravelersEmporiumMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'time-travelers-emporium',
        version: '1.0.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.setupResourceHandlers();
    this.setupToolHandlers();
  }

  setupResourceHandlers() {
    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: [
          {
            uri: 'emporium://products',
            mimeType: 'application/json',
            name: 'All Products',
            description: 'Complete catalog of temporal artifacts and their details'
          },
          {
            uri: 'emporium://products/featured',
            mimeType: 'application/json',
            name: 'Featured Products',
            description: 'Currently featured temporal artifacts'
          },
          {
            uri: 'emporium://products/categories',
            mimeType: 'application/json',
            name: 'Product Categories',
            description: 'All available product categories'
          },
          {
            uri: 'emporium://products/eras',
            mimeType: 'application/json',
            name: 'Historical Eras',
            description: 'All historical eras represented in the catalog'
          },
          {
            uri: 'emporium://analytics/stats',
            mimeType: 'application/json',
            name: 'Store Analytics',
            description: 'Price statistics and catalog metrics'
          }
        ]
      };
    });

    // Read specific resources
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      switch (uri) {
        case 'emporium://products':
          return {
            contents: [{
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(ProductService.getAllProducts(), null, 2)
            }]
          };

        case 'emporium://products/featured':
          return {
            contents: [{
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(ProductService.getFeaturedProducts(), null, 2)
            }]
          };

        case 'emporium://products/categories':
          return {
            contents: [{
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(ProductService.getCategories(), null, 2)
            }]
          };

        case 'emporium://products/eras':
          return {
            contents: [{
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(ProductService.getEras(), null, 2)
            }]
          };

        case 'emporium://analytics/stats':
          const stats = {
            priceRange: ProductService.getPriceRange(),
            categories: ProductService.getCategories(),
            eras: ProductService.getEras(),
            totalProducts: ProductService.getAllProducts().length,
            featuredCount: ProductService.getFeaturedProducts().length
          };
          return {
            contents: [{
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(stats, null, 2)
            }]
          };

        default:
          throw new Error(`Unknown resource: ${uri}`);
      }
    });
  }

  setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'search_products',
            description: 'Search for products by name, description, category, or era',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query string'
                },
                category: {
                  type: 'string',
                  description: 'Filter by category (optional)'
                },
                era: {
                  type: 'string',
                  description: 'Filter by historical era (optional)'
                },
                sortBy: {
                  type: 'string',
                  enum: ['name', 'price-low', 'price-high', 'era'],
                  description: 'Sort results by specified criteria'
                }
              },
              required: ['query']
            }
          },
          {
            name: 'get_product_details',
            description: 'Get detailed information about a specific product',
            inputSchema: {
              type: 'object',
              properties: {
                productId: {
                  type: 'string',
                  description: 'The ID of the product to retrieve'
                }
              },
              required: ['productId']
            }
          },
          {
            name: 'filter_products_by_price',
            description: 'Find products within a specific price range',
            inputSchema: {
              type: 'object',
              properties: {
                minPrice: {
                  type: 'number',
                  description: 'Minimum price (optional)'
                },
                maxPrice: {
                  type: 'number',
                  description: 'Maximum price (optional)'
                },
                era: {
                  type: 'string',
                  description: 'Filter by era (optional)'
                }
              }
            }
          },
          {
            name: 'get_products_by_era',
            description: 'Get all products from a specific historical era',
            inputSchema: {
              type: 'object',
              properties: {
                era: {
                  type: 'string',
                  enum: ['ancient', 'medieval', 'renaissance', 'modern', 'future'],
                  description: 'The historical era to filter by'
                }
              },
              required: ['era']
            }
          },
          {
            name: 'add_to_cart',
            description: 'Add a product to the shopping cart',
            inputSchema: {
              type: 'object',
              properties: {
                productId: {
                  type: 'string',
                  description: 'The ID of the product to add'
                },
                quantity: {
                  type: 'number',
                  description: 'Quantity to add (default: 1)',
                  minimum: 1
                },
                sessionId: {
                  type: 'string',
                  description: 'Customer session ID (optional, will use default if not provided)'
                }
              },
              required: ['productId']
            }
          },
          {
            name: 'get_cart_summary',
            description: 'Get current cart contents and summary',
            inputSchema: {
              type: 'object',
              properties: {
                sessionId: {
                  type: 'string',
                  description: 'Customer session ID (optional)'
                }
              }
            }
          }
        ]
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'search_products':
          return this.handleSearchProducts(args);
        case 'get_product_details':
          return this.handleGetProductDetails(args);
        case 'filter_products_by_price':
          return this.handleFilterProductsByPrice(args);
        case 'get_products_by_era':
          return this.handleGetProductsByEra(args);
        case 'add_to_cart':
          return this.handleAddToCart(args);
        case 'get_cart_summary':
          return this.handleGetCartSummary(args);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  async handleSearchProducts(args) {
    const { query, category, era, sortBy } = args;
    let products = ProductService.searchProducts(query);

    if (category) {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (era) {
      products = products.filter(p => p.era.toLowerCase() === era.toLowerCase());
    }

    if (sortBy) {
      products = ProductService.sortProducts(products, sortBy);
    }

    return {
      content: [{
        type: 'text',
        text: `Found ${products.length} products matching "${query}":\n\n${products.map(p => 
          `• **${p.name}** (${p.era}) - $${p.price}\n  ${p.description}`
        ).join('\n\n')}`
      }]
    };
  }

  async handleGetProductDetails(args) {
    const { productId } = args;
    const product = ProductService.getProductById(productId);

    if (!product) {
      return {
        content: [{
          type: 'text',
          text: `Product with ID "${productId}" not found.`
        }]
      };
    }

    return {
      content: [{
        type: 'text',
        text: `**${product.name}**\n\n` +
              `**Era:** ${product.era}\n` +
              `**Category:** ${product.category}\n` +
              `**Price:** $${product.price}\n` +
              `**Featured:** ${product.featured ? 'Yes' : 'No'}\n\n` +
              `**Description:** ${product.description}`
      }]
    };
  }

  async handleFilterProductsByPrice(args) {
    const { minPrice = 0, maxPrice = Infinity, era } = args;
    let products = ProductService.getAllProducts();

    products = products.filter(p => p.price >= minPrice && p.price <= maxPrice);

    if (era) {
      products = products.filter(p => p.era.toLowerCase() === era.toLowerCase());
    }

    return {
      content: [{
        type: 'text',
        text: `Found ${products.length} products between $${minPrice} and $${maxPrice === Infinity ? '∞' : maxPrice}:\n\n${products.map(p => 
          `• **${p.name}** - $${p.price} (${p.era})`
        ).join('\n')}`
      }]
    };
  }

  async handleGetProductsByEra(args) {
    const { era } = args;
    const products = ProductService.getProductsByEra(era);

    return {
      content: [{
        type: 'text',
        text: `Found ${products.length} products from the ${era} era:\n\n${products.map(p => 
          `• **${p.name}** - $${p.price}\n  ${p.description}`
        ).join('\n\n')}`
      }]
    };
  }

  async handleAddToCart(args) {
    const { productId, quantity = 1, sessionId = 'mcp-session' } = args;
    
    try {
      const cart = CartService.addToCart(sessionId, productId, quantity);
      const product = ProductService.getProductById(productId);
      const summary = CartService.getCartSummary(sessionId);

      return {
        content: [{
          type: 'text',
          text: `Added ${quantity}x "${product.name}" to cart!\n\n` +
                `**Cart Summary:**\n` +
                `• Total Items: ${summary.totalItems}\n` +
                `• Total Price: $${summary.totalPrice.toFixed(2)}\n` +
                `• Unique Products: ${summary.itemCount}`
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `Error adding to cart: ${error.message}`
        }]
      };
    }
  }

  async handleGetCartSummary(args) {
    const { sessionId = 'mcp-session' } = args;
    const cart = CartService.getCartSummary(sessionId);

    if (cart.items.length === 0) {
      return {
        content: [{
          type: 'text',
          text: 'Cart is empty.'
        }]
      };
    }

    const itemsList = cart.items.map(item => 
      `• ${item.quantity}x **${item.product.name}** - $${(item.product.price * item.quantity).toFixed(2)}`
    ).join('\n');

    return {
      content: [{
        type: 'text',
        text: `**Shopping Cart:**\n\n${itemsList}\n\n` +
              `**Summary:**\n` +
              `• Total Items: ${cart.totalItems}\n` +
              `• Total Price: $${cart.totalPrice.toFixed(2)}\n` +
              `• Last Updated: ${cart.updatedAt.toLocaleString()}`
      }]
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Time Travelers\' Emporium MCP Server running on stdio');
  }
}

// Run the server
const server = new TimeTravelersEmporiumMCPServer();
server.run().catch(console.error);
