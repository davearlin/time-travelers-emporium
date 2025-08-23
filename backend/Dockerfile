# Use Node.js official image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY shared/package*.json ./shared/ 2>/dev/null || echo "No shared package.json"

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY backend/ ./backend/
COPY shared/ ./shared/

# Expose port
EXPOSE 3001

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Start the backend server
CMD ["node", "backend/src/server.js"]
