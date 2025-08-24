# OpenAPI Schemas

This folder contains importable OpenAPI specs for integrations.

- `mcp-streamable.yaml` — Minimal schema to register an MCP Streamable endpoint (`POST /mcp`) with Copilot Studio via a Custom Connector.

Notes:
- Our MCP server actually runs over stdio (not HTTP). The `/mcp` HTTP route in the backend is a harmless placeholder that returns 200 to satisfy connector validation.
- If you later expose a real MCP transport over HTTP or WebSocket, update this spec and the backend route accordingly.
