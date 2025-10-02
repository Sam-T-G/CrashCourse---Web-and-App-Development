# 🚀 Quick Start Guide

**Get up and running in 5 minutes!**

This guide will help you set up your environment and start learning web development quickly.

---

## ⏱️ 5-Minute Setup

### Step 1: Install Node.js (2 minutes)

Choose your operating system:

<details>
<summary><b>🍎 macOS</b></summary>

**Easiest Method - Using Homebrew:**

```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

**Alternative - Direct Download:**

1. Go to [nodejs.org](https://nodejs.org/)
2. Download the **LTS** version (green button)
3. Run the installer
4. Restart Terminal

**Verify:**

```bash
node --version
npm --version
```

</details>

<details>
<summary><b>🪟 Windows</b></summary>

**Easiest Method - Direct Download:**

1. Go to [nodejs.org](https://nodejs.org/)
2. Download the **LTS** version (green button)
3. Run the installer
4. Click "Next" through all steps
5. Restart Command Prompt or PowerShell

**Verify:**

```bash
node --version
npm --version
```

</details>

<details>
<summary><b>🐧 Linux (Ubuntu/Debian)</b></summary>

```bash
# Update package manager
sudo apt update

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

</details>

---

### Step 2: Get the Course Files (1 minute)

**Option A - Download ZIP:**

1. Click the green **Code** button on GitHub
2. Click **Download ZIP**
3. Extract to your Desktop or Documents folder

**Option B - Clone with Git:**

```bash
git clone https://github.com/yourusername/CrashCourse---Web-and-App-Development.git
cd CrashCourse---Web-and-App-Development
```

---

### Step 3: Install Dependencies (1 minute)

Open Terminal/Command Prompt in the project folder:

```bash
# Install all packages (one-time setup)
npm install

# Make server scripts executable (macOS/Linux)
chmod +x *.sh
```

**Wait for:** `added 234 packages` message

---

### Step 4: Start Learning! (1 minute)

You have multiple server options for both traditional and modern development:

#### 🎨 Traditional Web Development

**Option 1: Node.js Server (Recommended)**

```bash
# Start the custom Node.js server
./start-server.sh

# Open your browser to:
http://localhost:3000
```

**Option 2: Alternative Servers (No Python Required)**

```bash
# PHP Server (if PHP is installed)
./php-server.sh
# → http://localhost:8000

# Ruby Server (if Ruby is installed)
./ruby-server.sh
# → http://localhost:8000

# NPX Server (no installation needed)
./npx-server.sh
# → http://localhost:8000
```

**Option 3: Python Server (if Python is installed)**

```bash
# Traditional Python server
python3 -m http.server 8000
# → http://localhost:8000
```

#### ⚛️ Modern Frameworks (React/Next.js)

```bash
# Start the Next.js development server
npm run dev

# Open your browser to:
http://localhost:3000
```

---

## 🎯 Your First Module

### Traditional Path:

**Using Node.js Server (Recommended):**

```bash
# In your browser, navigate to:
http://localhost:3000/traditional-web-stack/01-html-basics/
```

**Using Alternative Servers:**

```bash
# PHP/Ruby/NPX servers:
http://localhost:8000/traditional-web-stack/01-html-basics/

# Python server (old structure):
http://localhost:8000/01-traditional-web/01-html-visual-basics/visual-demo/
```

**You'll see:**

- Interactive HTML demos
- Live code editors
- Real-time preview
- Hands-on examples

### Modern Path:

```bash
# In your browser, navigate to:
http://localhost:3000/modern-dashboard
```

**You'll see:**

- React components
- Tailwind styling
- Next.js features
- Production examples

---

## 🔥 Pro Tips

### 1. Use the Live Code Editors

- **Edit the code** directly in the browser
- **See changes** in real-time
- **Experiment** freely - you can always reset

### 2. Follow the Learning Path

```
Traditional Web → CSS Mastery → JavaScript → Bridge → Modern Frameworks
```

### 3. Keep Both Servers Running

**Recommended Setup:**

- **Terminal 1:** `./start-server.sh` (Traditional - Node.js server)
- **Terminal 2:** `npm run dev` (Modern - Next.js server)

**Alternative Setup:**

- **Terminal 1:** `./php-server.sh` or `./ruby-server.sh` (Traditional)
- **Terminal 2:** `npm run dev` (Modern)

---

## 🆘 Common Issues & Quick Fixes

### ❌ "Port already in use"

```bash
# Node.js server - use different port
PORT=8000 node simple-server.js

# Alternative servers - use different port
php -S localhost:8001
ruby -run -e httpd . -p 8001
npx serve . -p 8001

# Modern server - use different port
npm run dev -- -p 3001
```

### ❌ "npm install fails"

```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### ❌ "Live editor blank"

- Check internet connection (Monaco loads from CDN)
- Try a different browser
- Clear browser cache

### ❌ "Command not found"

```bash
# Check Node.js installation
node --version

# Check if server scripts are executable
ls -la *.sh

# Make scripts executable if needed
chmod +x *.sh

# Reinstall if needed (see Step 1)
```

### ❌ "Permission denied" (macOS/Linux)

```bash
# Make scripts executable
chmod +x *.sh

# Then try again
./start-server.sh
```

### ❌ "Server script not found"

```bash
# Check if you're in the right directory
pwd
ls -la *.sh

# Navigate to project root if needed
cd /path/to/CrashCourse---Web-and-App-Development
```

---

## 📚 What's Next?

### Learning Sequence:

1. **HTML Basics** → Visual elements and structure
2. **CSS Styling** → Colors, layouts, animations
3. **JavaScript** → Interactivity and logic
4. **Bridge Module** → Traditional vs Modern
5. **React** → Component-based architecture
6. **Tailwind** → Utility-first styling
7. **Next.js** → Full-stack framework
8. **Final Project** → Build a dashboard

---

## 🎓 Additional Resources

| Resource          | Link                                                                             |
| ----------------- | -------------------------------------------------------------------------------- |
| Full README       | [README.md](README.md)                                                           |
| Setup Guide       | [resources/setup-guide.md](resources/setup-guide.md)                             |
| Quick Reference   | [resources/quick-reference.md](resources/quick-reference.md)                     |
| Live Editor Guide | [resources/live-editor-documentation.md](resources/live-editor-documentation.md) |

---

## ✅ Checklist

Before you start coding:

- [ ] Node.js installed (`node --version` works)
- [ ] npm installed (`npm --version` works)
- [ ] Course files downloaded
- [ ] Dependencies installed (`npm install` completed)
- [ ] Web server running (port 8000 or 3000)
- [ ] Browser open to localhost
- [ ] Code editor ready (VS Code recommended)

---

## 🚀 You're All Set!

**Recommended Commands:**

```bash
# Traditional modules (Node.js server - best option)
./start-server.sh
# → http://localhost:3000

# Modern modules
npm run dev
# → http://localhost:3000
```

**Alternative Commands:**

```bash
# Traditional modules (alternative servers)
./php-server.sh    # → http://localhost:8000
./ruby-server.sh   # → http://localhost:8000
./npx-server.sh    # → http://localhost:8000
python3 -m http.server 8000  # → http://localhost:8000

# Modern modules
npm run dev
# → http://localhost:3000
```

**Happy coding!** 🎉

---

## 📞 Need Help?

1. Check the [full README](README.md) for detailed instructions
2. Review the troubleshooting section
3. Open an issue on GitHub with:
   - Your OS
   - Node version
   - Error message
   - What you were trying to do
