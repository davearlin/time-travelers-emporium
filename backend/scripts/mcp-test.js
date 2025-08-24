#!/usr/bin/env node
// Minimal MCP client to connect to the local stdio server and exercise tools

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const serverCommand = process.platform === 'win32' ? 'node.exe' : 'node';
  const serverArgs = [path.resolve(__dirname, '..', 'src', 'mcp', 'server.js')];
  const transport = new StdioClientTransport({ command: serverCommand, args: serverArgs, cwd: path.resolve(__dirname, '..', '..') });

  const client = new Client({
    name: 'emporium-mcp-test-client',
    version: '1.0.0',
  }, { capabilities: {} });

  await client.connect(transport);
  console.log('Connected to MCP server');

  // List tools
  const tools = await client.listTools();
  console.log('Tools:', tools.tools.map(t => t.name));

  // Try search_products
  const searchResult = await client.callTool({
    name: 'search_products',
    arguments: { query: 'axe', era: 'medieval' }
  });
  console.log('\nsearch_products result:\n', searchResult.content?.[0]?.text ?? searchResult);

  // Try add_to_cart
  const addToCart = await client.callTool({
    name: 'add_to_cart',
    arguments: { productId: '14', quantity: 2, sessionId: 'test-session' }
  });
  console.log('\nadd_to_cart result:\n', addToCart.content?.[0]?.text ?? addToCart);

  // Try get_cart_summary
  const cart = await client.callTool({
    name: 'get_cart_summary',
    arguments: { sessionId: 'test-session' }
  });
  console.log('\nget_cart_summary result:\n', cart.content?.[0]?.text ?? cart);

  await client.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
