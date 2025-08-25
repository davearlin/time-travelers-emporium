#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import express from 'express';
import { WebSocketServer } from 'ws';
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

  // ... (all your existing handler methods stay the same)

  // Add HTTP/WebSocket transport support
  async runHttp(port = 3002) {
    const app = express();
    app.use(express.json());

    // Health check for HTTP transport
    app.get('/health', (req, res) => {
      res.json({ status: 'MCP Server HTTP Transport OK', timestamp: new Date().toISOString() });
    });

    // JSON-RPC over HTTP
    app.post('/mcp', async (req, res) => {
      try {
        const response = await this.server.handleRequest(req.body);
        res.json(response);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    const httpServer = app.listen(port, () => {
      console.error(`MCP Server HTTP transport running on port ${port}`);
    });

    // WebSocket transport
    const wss = new WebSocketServer({ server: httpServer, path: '/mcp-ws' });
    wss.on('connection', (ws) => {
      console.error('MCP WebSocket client connected');
      
      ws.on('message', async (data) => {
        try {
          const request = JSON.parse(data.toString());
          const response = await this.server.handleRequest(request);
          ws.send(JSON.stringify(response));
        } catch (error) {
          ws.send(JSON.stringify({ error: error.message }));
        }
      });
    });
  }

  // Keep existing stdio transport for local development
  async runStdio() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Time Travelers\' Emporium MCP Server running on stdio');
  }
}

// Determine transport based on environment
const server = new TimeTravelersEmporiumMCPServer();

if (process.env.MCP_TRANSPORT === 'http' || process.env.NODE_ENV === 'production') {
  // Use HTTP transport for remote/production
  server.runHttp(process.env.MCP_PORT || 3002).catch(console.error);
} else {
  // Use stdio transport for local development
  server.runStdio().catch(console.error);
}
