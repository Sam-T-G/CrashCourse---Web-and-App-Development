#!/bin/bash

echo "🚀 Starting Web Development Course Server..."
echo "📁 Serving from: $(pwd)"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Start the server
node simple-server.js
