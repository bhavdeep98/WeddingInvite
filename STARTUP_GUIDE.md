# 🚀 Wedding Website Startup Guide

This guide shows you how to start all services for your wedding website with a single command.

## 📋 **Prerequisites**

Make sure you have installed:
- ✅ **Node.js** (v16 or higher)
- ✅ **npm** (comes with Node.js)
- ✅ **ngrok** (for public access)

## 🎯 **Quick Start**

### **Option 1: Single Command (Recommended)**

#### **macOS/Linux:**
```bash
npm run start-all
```

#### **Windows:**
```bash
npm run start-all-win
```

### **Option 2: Direct Script Execution**

#### **macOS/Linux:**
```bash
./start-all.sh
```

#### **Windows:**
```bash
start-all.bat
```

## 🔧 **What the Script Does**

The startup script automatically:

1. **🔍 Checks Dependencies**
   - Verifies Node.js and ngrok are installed
   - Checks if required ports (3001, 8080, 4040) are available

2. **🚀 Starts Backend Server**
   - Runs `node server.js` on port 3001
   - Handles form submissions and saves data locally

3. **🌐 Starts Frontend Server**
   - Runs `npm run dev` on port 8080
   - Serves the React wedding website
   - Proxies API requests to backend

4. **🔗 Starts ngrok Tunnel**
   - Creates public tunnel to port 8080
   - Provides public URL for sharing

5. **📊 Displays Information**
   - Shows all URLs (local and public)
   - Provides useful commands
   - Shows API endpoints

## 📱 **What You'll See**

After running the script, you'll see output like:

```
🎊 All services are running successfully!
========================================

📱 Public Website URL:
   https://abc123.ngrok-free.app

🔧 Local URLs:
   Frontend: http://localhost:8080
   Backend API: http://localhost:3001
   ngrok Dashboard: http://localhost:4040

📊 API Endpoints:
   Health Check: https://abc123.ngrok-free.app/api/health
   View Submissions: https://abc123.ngrok-free.app/api/submissions

💡 Useful Commands:
   View submissions: node view-submissions.js
   Check ngrok status: curl http://localhost:4040/api/tunnels

🛑 Press Ctrl+C to stop all services
```

## 🛑 **Stopping Services**

### **macOS/Linux:**
- Press `Ctrl+C` in the terminal running the script
- All services will be stopped automatically

### **Windows:**
- Close the individual terminal windows
- Or press `Ctrl+C` in each window

## 🔍 **Manual Commands (Alternative)**

If you prefer to run services manually:

```bash
# Terminal 1: Backend Server
node server.js

# Terminal 2: Frontend Server
npm run dev

# Terminal 3: ngrok Tunnel
ngrok http 8080
```

## 🛠 **Troubleshooting**

### **Port Already in Use**
```
❌ Port 3001 is already in use by backend server
```
**Solution:** Stop the service using that port and try again

### **Node.js Not Found**
```
❌ Node.js is not installed or not in PATH
```
**Solution:** Install Node.js from https://nodejs.org/

### **ngrok Not Found**
```
❌ ngrok is not installed or not in PATH
```
**Solution:** Install ngrok from https://ngrok.com/

### **Backend Failed to Start**
```
❌ Backend server failed to start
```
**Solution:** Check if port 3001 is available and try again

### **Frontend Failed to Start**
```
❌ Frontend server failed to start
```
**Solution:** Check if port 8080 is available and try again

## 📊 **Monitoring**

### **View Form Submissions:**
```bash
node view-submissions.js
```

### **Check ngrok Status:**
```bash
curl http://localhost:4040/api/tunnels
```

### **Test API Health:**
```bash
curl http://localhost:3001/api/health
```

## 🎉 **Sharing Your Website**

Once the script is running, share the **Public Website URL** with people:
- They can view your wedding website
- Fill out the contact form
- Submit messages that appear on your local computer

## 📝 **File Structure**

```
wedding-website/
├── start-all.sh          # macOS/Linux startup script
├── start-all.bat         # Windows startup script
├── server.js             # Backend server
├── view-submissions.js   # View form submissions
├── package.json          # npm scripts
└── src/
    └── components/
        └── ContactSection.tsx  # Contact form
```

## 🔄 **Restarting Services**

If you need to restart all services:

1. **Stop current services** (Ctrl+C or close windows)
2. **Run the startup script again** (`npm run start-all`)

The script will automatically clean up and restart everything fresh.

---

**Happy sharing your wedding website! 🎊💒**
