# Simple HTTP Server

A zero-dependency Node.js HTTP server for serving the Web Development Course files.

## 🚀 Quick Start

### Option 1: Using the Script (Recommended)

```bash
./start-server.sh
```

### Option 2: Direct Node.js

```bash
node simple-server.js
```

### Option 3: Custom Port

```bash
PORT=8000 node simple-server.js
```

## 📁 What It Serves

The server will serve files from the current directory and provide access to:

- **Traditional Web Stack**: `http://localhost:3000/traditional-web-stack/`
- **Modern Web Stack**: `http://localhost:3000/modern-web-stack/`
- **Resources**: `http://localhost:3000/resources/`
- **Any HTML file**: Direct access to individual modules

## 🎯 Perfect For

- ✅ **Traditional Web Stack** - Static HTML/CSS/JS files
- ✅ **External CDNs** - Monaco Editor, React, Tailwind CSS
- ✅ **CORS Support** - No security restrictions
- ✅ **Proper MIME Types** - All file types served correctly
- ✅ **Zero Dependencies** - Just Node.js built-in modules

## 🔧 Features

- **Static File Serving**: Serves HTML, CSS, JS, images, fonts
- **CORS Headers**: Allows external CDN resources
- **404 Handling**: Custom 404 page with navigation
- **Security**: Prevents directory traversal attacks
- **MIME Types**: Proper content types for all file extensions
- **Graceful Shutdown**: Ctrl+C to stop cleanly

## 📚 Example URLs

```
http://localhost:3000/traditional-web-stack/01-html-visual-basics/interactive-structure.html
http://localhost:3000/traditional-web-stack/02c-css-flexbox-deep-dive/flexbox-advanced.html
http://localhost:3000/modern-web-stack/01-react-components/component-basics.html
http://localhost:3000/modern-web-stack/02-tailwind-styling/utility-first-demo.html
```

## 🛠️ Requirements

- **Node.js** (any version) - No npm packages needed!
- **No Dependencies** - Uses only Node.js built-in modules

## 🆚 Why This vs Other Options

| Method                   | Dependencies | CORS Support | Traditional Files    |
| ------------------------ | ------------ | ------------ | -------------------- |
| **This Server**          | ✅ None      | ✅ Yes       | ✅ Perfect           |
| `npx serve`              | ❌ Downloads | ✅ Yes       | ❌ Framework-focused |
| `python3 -m http.server` | ❌ Python    | ❌ Limited   | ✅ Works             |
| `php -S`                 | ❌ PHP       | ✅ Yes       | ✅ Works             |
| File Protocol            | ✅ None      | ❌ No        | ❌ CORS issues       |

## 🎮 Usage Tips

1. **Start the server** in the project root directory
2. **Navigate to any module** using the URLs above
3. **Interactive demos work perfectly** with external CDNs
4. **Live code editors function** without CORS issues
5. **Stop with Ctrl+C** when done

## 🔍 Troubleshooting

### Port Already in Use

```bash
PORT=8000 node simple-server.js
```

### Permission Denied (macOS/Linux)

```bash
chmod +x start-server.sh
./start-server.sh
```

### Node.js Not Found

Install Node.js from [nodejs.org](https://nodejs.org/)

---

**Perfect for serving your traditional web development course!** 🎯
