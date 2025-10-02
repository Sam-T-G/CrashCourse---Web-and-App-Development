#!/bin/bash

echo "🚀 Starting PHP HTTP Server..."
echo "📁 Serving from: $(pwd)"
echo ""

# Check if PHP is installed
if ! command -v php &> /dev/null; then
    echo "❌ PHP is not installed. Please install PHP first."
    echo "   macOS: brew install php"
    echo "   Ubuntu: sudo apt install php"
    echo "   Windows: Download from https://php.net/"
    exit 1
fi

# Start PHP server
echo "🌐 Server will be available at: http://localhost:8000"
echo "💡 Press Ctrl+C to stop the server"
echo ""

php -S localhost:8000
