#!/bin/bash

# Railway Startup Script for Wedding Website
# This script is optimized for Railway deployment

echo "🚀 Starting Wedding Website on Railway..."

# Function to cleanup on exit
cleanup() {
    echo "🛑 Shutting down..."
    pkill -f "node server.js" 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Check if we're in production mode
if [ "$NODE_ENV" = "production" ]; then
    echo "🏭 Production mode detected"
    
    # Serve static files from the built frontend
    if [ -d "dist" ]; then
        echo "📁 Serving built frontend from dist/"
        # The server.js will handle serving static files
    else
        echo "⚠️  Warning: dist/ directory not found. Building frontend..."
        npm run build
    fi
else
    echo "🔧 Development mode - building frontend..."
    npm run build
fi

# Start the backend server (which will also serve the frontend)
echo "🌐 Starting backend server..."
echo "   - Backend API: http://localhost:$PORT/api"
echo "   - Frontend: http://localhost:$PORT"
echo "   - Health check: http://localhost:$PORT/api/health"

# Start the simplified server
node server-simple.js

# If we reach here, the server has stopped
echo "🛑 Server stopped"
