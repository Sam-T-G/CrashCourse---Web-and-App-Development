#!/bin/bash

echo "🚀 Starting Deno HTTP Server..."
echo "📁 Serving from: $(pwd)"
echo ""

# Check if Deno is installed
if ! command -v deno &> /dev/null; then
    echo "❌ Deno is not installed. Please install Deno first."
    echo "   macOS: brew install deno"
    echo "   Linux: curl -fsSL https://deno.land/install.sh | sh"
    echo "   Windows: iwr https://deno.land/install.ps1 -useb | iex"
    echo "   Or visit: https://deno.land/"
    exit 1
fi

# Start Deno server
echo "🌐 Server will be available at: http://localhost:8000"
echo "💡 Press Ctrl+C to stop the server"
echo ""

deno run --allow-net --allow-read https://deno.land/std@0.208.0/http/file_server.ts . --port 8000
