#!/bin/bash

echo "🚀 Starting NPX HTTP Server..."
echo "📁 Serving from: $(pwd)"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if npx is available
if ! command -v npx &> /dev/null; then
    echo "❌ NPX is not available. Please update Node.js."
    exit 1
fi

# Start NPX server
echo "🌐 Server will be available at: http://localhost:8000"
echo "💡 Press Ctrl+C to stop the server"
echo ""

npx serve . -p 8000
