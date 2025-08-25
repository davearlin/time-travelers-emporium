#!/usr/bin/env node

import { ProductService } from '../services/productService.js';
import { CartService } from '../services/cartService.js';

export class TimeTravelersEmporiumMCPServer {
  constructor() {
    this.serverInfo = {
      name: 'time-travelers-emporium',
      version: '1.0.0',
      protocolVersion: 'mcp-streamable-1.0'
    };
  }

  /**
   * Handle MCP Streamable requests from Copilot Studio and other LLM agents
   * Implements the mcp-streamable-1.0 protocol
   */
  async handleStreamableRequest(requestBody) {
    const { method, params, id, jsonrpc } = requestBody;

    try {
      let result;
      switch (method) {
        case 'initialize':
          result = await this.handleInitialize(params);
          break;
        
        case 'tools/list':
          result = await this.handleListTools();
          break;
        
        case 'tools/call':
          result = await this.handleToolCall(params);
          break;
        
        case 'resources/list':
          result = await this.handleListResources();
          break;
        
        case 'resources/read':
          result = await this.handleReadResource(params);
          break;
        
        default:
          return {
            jsonrpc: jsonrpc || '2.0',
            id: id || null,
            error: {
              code: -32601,
              message: `Method not found: ${method}`
            }
          };
      }

      // Return JSON-RPC format if id is present (Copilot Studio), otherwise simple format
      if (id !== undefined) {
        return {
          jsonrpc: jsonrpc || '2.0',
          id: id,
          ...result
        };
      }
      return result;

    } catch (error) {
      return {
        jsonrpc: jsonrpc || '2.0',
        id: id || null,
        error: {
          code: -32603,
          message: `Internal error: ${error.message}`
        }
      };
    }
  }

  async handleInitialize(params) {
    return {
      result: {
        protocolVersion: 'mcp-streamable-1.0',
        capabilities: {
          tools: {
            listChanged: false
          },
          resources: {
            subscribe: false,
            listChanged: false
          }
        },
        serverInfo: this.serverInfo
      }
    };
  }

  async handleListTools() {
    // Return a minimal set of tools for testing
    return {
      result: {
        tools: [
          {
            name: 'test_tool',
            description: 'A simple test tool',
            inputSchema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  description: 'Test message'
                }
              },
              required: ['message']
            }
          }
        ]
      }
    };
  }

  async handleListResources() {
    return {
      result: {
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
            description: 'Available product categories'
          },
          {
            uri: 'emporium://products/eras',
            mimeType: 'application/json',
            name: 'Historical Eras',
            description: 'Available historical eras'
          },
          {
            uri: 'emporium://analytics/stats',
            mimeType: 'application/json',
            name: 'Analytics Stats',
            description: 'Price ranges, categories, and product statistics'
          }
        ]
      }
    };
  }

  async handleReadResource(params) {
    const { uri } = params;
    
    switch (uri) {
      case 'emporium://products':
        return {
          result: {
            contents: [{
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(ProductService.getAllProducts(), null, 2)
            }]
          }
        };

      case 'emporium://products/featured':
        return {
          result: {
            contents: [{
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(ProductService.getFeaturedProducts(), null, 2)
            }]
          }
        };

      case 'emporium://products/categories':
        return {
          result: {
            contents: [{
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(ProductService.getCategories(), null, 2)
            }]
          }
        };

      case 'emporium://products/eras':
        return {
          result: {
            contents: [{
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(ProductService.getEras(), null, 2)
            }]
          }
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
          result: {
            contents: [{
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(stats, null, 2)
            }]
          }
        };

      default:
        return {
          error: {
            code: -32602,
            message: `Unknown resource: ${uri}`
          }
        };
    }
  }

  async handleToolCall(params) {
    const { name, arguments: args } = params;

    try {
      switch (name) {
        case 'search_products':
          return await this.handleSearchProducts(args);
        case 'get_product_details':
          return await this.handleGetProductDetails(args);
        case 'filter_products_by_price':
          return await this.handleFilterProductsByPrice(args);
        case 'get_products_by_era':
          return await this.handleGetProductsByEra(args);
        case 'add_to_cart':
          return await this.handleAddToCart(args);
        case 'get_cart_summary':
          return await this.handleGetCartSummary(args);
        case 'get_featured_products':
          return await this.handleGetFeaturedProducts(args);
        case 'get_categories':
          return await this.handleGetCategories(args);
        default:
          return {
            error: {
              code: -32602,
              message: `Unknown tool: ${name}`
            }
          };
      }
    } catch (error) {
      return {
        error: {
          code: -32603,
          message: `Tool execution error: ${error.message}`
        }
      };
    }
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
      result: {
        content: [{
          type: 'text',
          text: `Found ${products.length} temporal artifacts matching "${query}":\n\n${products.map(p => 
            `🕰️ **${p.name}** (${p.era})\n💰 $${p.price.toLocaleString()}\n📝 ${p.description}\n🏷️ Category: ${p.category}\n🆔 ID: ${p.id}`
          ).join('\n\n─────────────────────\n\n')}`
        }]
      }
    };
  }

  async handleGetProductDetails(args) {
    const { productId } = args;
    const product = ProductService.getProductById(productId);

    if (!product) {
      return {
        result: {
          content: [{
            type: 'text',
            text: `❌ Temporal artifact with ID "${productId}" not found in the Time Travelers' Emporium catalog.`
          }]
        }
      };
    }

    return {
      result: {
        content: [{
          type: 'text',
          text: `🕰️ **${product.name}**\n\n` +
                `📅 **Era:** ${product.era}\n` +
                `🏷️ **Category:** ${product.category}\n` +
                `💰 **Price:** $${product.price.toLocaleString()}\n` +
                `⭐ **Featured:** ${product.featured ? 'Yes' : 'No'}\n` +
                `🆔 **ID:** ${product.id}\n\n` +
                `📝 **Description:** ${product.description}`
        }]
      }
    };
  }

  async handleFilterProductsByPrice(args) {
    const { minPrice = 0, maxPrice = Infinity, era } = args;
    let products = ProductService.getAllProducts();

    products = products.filter(p => p.price >= minPrice && p.price <= maxPrice);

    if (era) {
      products = products.filter(p => p.era.toLowerCase() === era.toLowerCase());
    }

    const maxPriceDisplay = maxPrice === Infinity ? '∞' : `$${maxPrice.toLocaleString()}`;

    return {
      result: {
        content: [{
          type: 'text',
          text: `💰 Found ${products.length} temporal artifacts between $${minPrice.toLocaleString()} and ${maxPriceDisplay}${era ? ` from the ${era} era` : ''}:\n\n${products.map(p => 
            `🕰️ **${p.name}** - $${p.price.toLocaleString()} (${p.era})\n🆔 ID: ${p.id}`
          ).join('\n\n')}`
        }]
      }
    };
  }

  async handleGetProductsByEra(args) {
    const { era } = args;
    const products = ProductService.getProductsByEra(era);

    return {
      result: {
        content: [{
          type: 'text',
          text: `🕰️ Found ${products.length} temporal artifacts from the **${era}** era:\n\n${products.map(p => 
            `⚡ **${p.name}** - $${p.price.toLocaleString()}\n📝 ${p.description}\n🆔 ID: ${p.id}`
          ).join('\n\n─────────────────────\n\n')}`
        }]
      }
    };
  }

  async handleAddToCart(args) {
    const { productId, quantity = 1, sessionId = 'mcp-agent-session' } = args;
    
    try {
      const cart = CartService.addToCart(sessionId, productId, quantity);
      const product = ProductService.getProductById(productId);
      const summary = CartService.getCartSummary(sessionId);

      return {
        result: {
          content: [{
            type: 'text',
            text: `✅ Added ${quantity}x "${product.name}" to your temporal cart!\n\n` +
                  `🛒 **Cart Summary:**\n` +
                  `📦 Total Items: ${summary.totalItems}\n` +
                  `💰 Total Price: $${summary.totalPrice.toLocaleString()}\n` +
                  `🎯 Unique Products: ${summary.itemCount}`
          }]
        }
      };
    } catch (error) {
      return {
        result: {
          content: [{
            type: 'text',
            text: `❌ Error adding to cart: ${error.message}`
          }]
        }
      };
    }
  }

  async handleGetCartSummary(args) {
    const { sessionId = 'mcp-agent-session' } = args;
    const cart = CartService.getCartSummary(sessionId);

    if (cart.items.length === 0) {
      return {
        result: {
          content: [{
            type: 'text',
            text: '🛒 Your temporal cart is empty. Ready to collect some artifacts from across time?'
          }]
        }
      };
    }

    const itemsList = cart.items.map(item => 
      `📦 ${item.quantity}x **${item.product.name}** - $${(item.product.price * item.quantity).toLocaleString()}\n   🕰️ ${item.product.era} | 🆔 ${item.product.id}`
    ).join('\n');

    return {
      result: {
        content: [{
          type: 'text',
          text: `🛒 **Your Temporal Shopping Cart:**\n\n${itemsList}\n\n` +
                `📊 **Summary:**\n` +
                `📦 Total Items: ${cart.totalItems}\n` +
                `💰 Total Price: $${cart.totalPrice.toLocaleString()}\n` +
                `🕐 Last Updated: ${cart.updatedAt.toLocaleString()}`
        }]
      }
    };
  }

  async handleGetFeaturedProducts(args) {
    const products = ProductService.getFeaturedProducts();

    return {
      result: {
        content: [{
          type: 'text',
          text: `⭐ **Featured Temporal Artifacts:**\n\n${products.map(p => 
            `🕰️ **${p.name}** (${p.era})\n💰 $${p.price.toLocaleString()}\n📝 ${p.description}\n🆔 ID: ${p.id}`
          ).join('\n\n─────────────────────\n\n')}`
        }]
      }
    };
  }

  async handleGetCategories(args) {
    const categories = ProductService.getCategories();

    return {
      result: {
        content: [{
          type: 'text',
          text: `🏷️ **Available Product Categories:**\n\n${categories.map(cat => 
            `• ${cat}`
          ).join('\n')}`
        }]
      }
    };
  }
}
