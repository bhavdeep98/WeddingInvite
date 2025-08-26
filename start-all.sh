#!/bin/bash

# Wedding Website - Complete Startup Script
# This script starts all three services needed for the wedding website

echo "🎉 Starting Wedding Website Services..."
echo "========================================"

# Function to cleanup background processes on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down services..."
    pkill -f "node server.js" 2>/dev/null
    pkill -f "vite" 2>/dev/null
    pkill ngrok 2>/dev/null
    echo "✅ All services stopped"
    exit 0
}

# Set up signal handlers for graceful shutdown
trap cleanup SIGINT SIGTERM

# Check if required ports are available
check_port() {
    local port=$1
    local service=$2
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "❌ Port $port is already in use by $service"
        echo "   Please stop the service using port $port and try again"
        exit 1
    fi
}

echo "🔍 Checking port availability..."
check_port 3001 "backend server"
check_port 8080 "frontend server"
check_port 4040 "ngrok"

echo "✅ All ports are available"

# Start Backend Server
echo ""
echo "🚀 Starting Backend Server (port 3001)..."
node server.js &
BACKEND_PID=$!
sleep 3

# Check if backend started successfully
if ! curl -s http://localhost:3001/api/health >/dev/null; then
    echo "❌ Backend server failed to start"
    cleanup
fi
echo "✅ Backend server is running"

# Start Frontend Dev Server
echo ""
echo "🌐 Starting Frontend Dev Server (port 8080)..."
npm run dev &
FRONTEND_PID=$!
sleep 5

# Check if frontend started successfully
if ! curl -s http://localhost:8080 >/dev/null; then
    echo "❌ Frontend server failed to start"
    cleanup
fi
echo "✅ Frontend server is running"

# Start ngrok tunnel (if authenticated)
echo ""
echo "🔗 Starting ngrok tunnel..."

# Check if ngrok is authenticated
if ngrok config check &>/dev/null; then
    ngrok http 8080 &
    NGROK_PID=$!
    sleep 5

    # Get ngrok URL
    echo ""
    echo "🔍 Getting ngrok URL..."
    NGROK_URL=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null | grep -o '"public_url":"[^"]*"' | cut -d'"' -f4)

    if [ -z "$NGROK_URL" ]; then
        echo "⚠️  ngrok tunnel failed to start (may need authentication)"
        echo "   Run: ngrok config add-authtoken YOUR_TOKEN"
        echo "   Get your token from: https://dashboard.ngrok.com/get-started/your-authtoken"
        NGROK_URL="Not available (ngrok not authenticated)"
    else
        echo "✅ ngrok tunnel is active"
    fi
else
    echo "⚠️  ngrok is not authenticated - public URL will not be available"
    echo "   To enable public access:"
    echo "   1. Sign up at: https://ngrok.com/signup"
    echo "   2. Get your token from: https://dashboard.ngrok.com/get-started/your-authtoken"
    echo "   3. Run: ngrok config add-authtoken YOUR_TOKEN"
    NGROK_URL="Not available (ngrok not authenticated)"
fi

# Display status and URLs
echo ""
echo "🎊 All services are running successfully!"
echo "========================================"
echo ""
if [[ "$NGROK_URL" != "Not available"* ]]; then
    echo "📱 Public Website URL:"
    echo "   $NGROK_URL"
    echo ""
fi
echo "🔧 Local URLs:"
echo "   Frontend: http://localhost:8080"
echo "   Backend API: http://localhost:3001"
if [[ "$NGROK_URL" != "Not available"* ]]; then
    echo "   ngrok Dashboard: http://localhost:4040"
fi
echo ""
echo "📊 API Endpoints:"
if [[ "$NGROK_URL" != "Not available"* ]]; then
    echo "   Health Check: $NGROK_URL/api/health"
    echo "   View Submissions: $NGROK_URL/api/submissions"
else
    echo "   Health Check: http://localhost:3001/api/health"
    echo "   View Submissions: http://localhost:3001/api/submissions"
fi
echo ""
echo "💡 Useful Commands:"
echo "   View submissions: node view-submissions.js"
echo "   Check ngrok status: curl http://localhost:4040/api/tunnels"
echo ""
echo "🛑 Press Ctrl+C to stop all services"
echo ""

# Wait for user to stop
wait
