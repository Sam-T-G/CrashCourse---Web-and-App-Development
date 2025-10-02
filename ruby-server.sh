#!/bin/bash

echo "🚀 Starting Ruby HTTP Server..."
echo "📁 Serving from: $(pwd)"
echo ""

# Check if Ruby is installed
if ! command -v ruby &> /dev/null; then
    echo "❌ Ruby is not installed. Please install Ruby first."
    echo "   macOS: Ruby comes pre-installed"
    echo "   Ubuntu: sudo apt install ruby"
    echo "   Windows: Download from https://rubyinstaller.org/"
    exit 1
fi

# Start Ruby server
echo "🌐 Server will be available at: http://localhost:8000"
echo "💡 Press Ctrl+C to stop the server"
echo ""

ruby -run -e httpd . -p 8000
