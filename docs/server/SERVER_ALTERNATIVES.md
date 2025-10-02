# Server Alternatives (No Python Required)

Multiple alternatives to `python3 -m http.server` for serving your web development course.

## 🚀 Quick Start Options

### 1. **Node.js Server** (Recommended)
```bash
./start-server.sh
# or
node simple-server.js
```
**✅ Best for your course** - Handles CORS, directories, and external CDNs perfectly.

### 2. **PHP Server**
```bash
./php-server.sh
# or
php -S localhost:8000
```
**✅ Great alternative** - Built into most systems, handles static files well.

### 3. **Ruby Server**
```bash
./ruby-server.sh
# or
ruby -run -e httpd . -p 8000
```
**✅ Simple option** - Ruby comes pre-installed on macOS.

### 4. **NPX Server**
```bash
./npx-server.sh
# or
npx serve . -p 8000
```
**✅ No installation** - Downloads and runs without permanent installation.

### 5. **Deno Server**
```bash
./deno-server.sh
# or
deno run --allow-net --allow-read https://deno.land/std@0.208.0/http/file_server.ts . --port 8000
```
**✅ Modern option** - TypeScript-first runtime.

## 📊 Comparison Table

| Server | Dependencies | CORS Support | Directory Listing | Traditional Files | Installation |
|--------|-------------|--------------|-------------------|-------------------|--------------|
| **Node.js** | ✅ None | ✅ Perfect | ✅ Yes | ✅ Perfect | ✅ Pre-installed |
| **PHP** | ❌ PHP | ✅ Good | ✅ Yes | ✅ Perfect | ✅ Pre-installed (macOS) |
| **Ruby** | ❌ Ruby | ✅ Good | ✅ Yes | ✅ Perfect | ✅ Pre-installed (macOS) |
| **NPX** | ❌ Node.js | ✅ Perfect | ✅ Yes | ✅ Perfect | ✅ Downloads on use |
| **Deno** | ❌ Deno | ✅ Perfect | ✅ Yes | ✅ Perfect | ❌ Manual install |
| **Python** | ❌ Python | ❌ Limited | ✅ Yes | ✅ Perfect | ❌ Manual install |

## 🎯 Why These Are Better Than Python

### **CORS Support**
- **Python**: Limited CORS support, external CDNs may not work
- **Alternatives**: Full CORS support, Monaco Editor and React CDNs work perfectly

### **MIME Types**
- **Python**: Basic MIME type handling
- **Alternatives**: Proper MIME types for all file extensions

### **Directory Handling**
- **Python**: Basic directory listing
- **Alternatives**: Better directory navigation and index.html support

### **Performance**
- **Python**: Slower for static files
- **Alternatives**: Optimized for static file serving

## 🛠️ Installation Requirements

### **Node.js Server** (Recommended)
```bash
# Check if installed
node --version

# Install if needed
# macOS: brew install node
# Ubuntu: sudo apt install nodejs npm
# Windows: Download from https://nodejs.org/
```

### **PHP Server**
```bash
# Check if installed
php --version

# Install if needed
# macOS: brew install php
# Ubuntu: sudo apt install php
# Windows: Download from https://php.net/
```

### **Ruby Server**
```bash
# Check if installed
ruby --version

# Install if needed
# macOS: Usually pre-installed
# Ubuntu: sudo apt install ruby
# Windows: Download from https://rubyinstaller.org/
```

### **NPX Server**
```bash
# Requires Node.js (see above)
npx --version
```

### **Deno Server**
```bash
# Check if installed
deno --version

# Install if needed
# macOS: brew install deno
# Linux: curl -fsSL https://deno.land/install.sh | sh
# Windows: iwr https://deno.land/install.ps1 -useb | iex
```

## 🎮 Usage Examples

### **Start Servers**
```bash
# Node.js (recommended for your course)
./start-server.sh

# PHP
./php-server.sh

# Ruby
./ruby-server.sh

# NPX
./npx-server.sh

# Deno
./deno-server.sh
```

### **Custom Ports**
```bash
# Node.js
PORT=8080 node simple-server.js

# PHP
php -S localhost:8080

# Ruby
ruby -run -e httpd . -p 8080

# NPX
npx serve . -p 8080
```

## 🔧 Troubleshooting

### **Port Already in Use**
```bash
# Find what's using the port
lsof -ti:8000

# Kill the process
kill $(lsof -ti:8000)

# Or use a different port
PORT=8080 ./start-server.sh
```

### **Permission Denied**
```bash
# Make scripts executable
chmod +x *.sh
```

### **Command Not Found**
- **Node.js**: Install from [nodejs.org](https://nodejs.org/)
- **PHP**: Install from [php.net](https://php.net/)
- **Ruby**: Usually pre-installed on macOS
- **Deno**: Install from [deno.land](https://deno.land/)

## 🎯 Recommendation for Your Course

**Use the Node.js server** (`./start-server.sh`) because:

1. ✅ **Perfect CORS Support** - External CDNs work flawlessly
2. ✅ **Directory Navigation** - Browse folders easily
3. ✅ **Zero Dependencies** - Uses only Node.js built-ins
4. ✅ **Custom Features** - Built specifically for your course
5. ✅ **Error Handling** - Helpful error messages and port conflict resolution
6. ✅ **Beautiful Interface** - Custom 404 pages and directory listings

## 🌐 Access Your Course

Once any server is running, access your course at:

- **Homepage**: `http://localhost:8000/`
- **Traditional Stack**: `http://localhost:8000/traditional-web-stack/`
- **Modern Stack**: `http://localhost:8000/modern-web-stack/`
- **Individual Modules**: `http://localhost:8000/traditional-web-stack/01-html-visual-basics/interactive-structure.html`

---

**Choose your preferred server and start learning!** 🚀
