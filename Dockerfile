# Use Node.js 18 as base image
FROM node:18-alpine

# Install necessary packages
RUN apk add --no-cache bash curl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server-package.json ./server-package.json

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Make start script executable
RUN chmod +x start-all.sh

# Expose port
EXPOSE 8080 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/api/health || exit 1

# Start the application
CMD ["./start-all.sh"]
