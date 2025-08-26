# 📧 Wedding Website Form Submission System

This setup allows people to fill out contact forms on your wedding website and have the data automatically saved to your local computer through a **single ngrok tunnel**.

## 🚀 **How It Works (Combined Approach)**

1. **Frontend**: React form on your wedding website (port 8080)
2. **Backend**: Express.js server running locally on port 3001
3. **Proxy**: Vite dev server proxies `/api/*` requests to the backend
4. **Single Tunnel**: One ngrok tunnel exposes both frontend and backend
5. **Storage**: Form submissions are saved to local JSON files

## 📋 **Setup Instructions**

### 1. **Start the Backend Server**
```bash
# Start the form submission server
node server.js
```
The server will run on `http://localhost:3001`

### 2. **Start the Frontend with Proxy**
```bash
# Start Vite dev server (includes API proxy)
npm run dev
```
The frontend will run on `http://localhost:8080` and proxy API requests to the backend

### 3. **Start Single ngrok Tunnel**
```bash
# Expose both frontend and backend through one tunnel
ngrok http 8080
```
This creates a public URL like `https://abc123.ngrok-free.app` that serves both:
- **Website**: `https://abc123.ngrok-free.app/`
- **API**: `https://abc123.ngrok-free.app/api/*`

## 📁 **Data Storage**

Form submissions are saved in two places:
- **Individual files**: `form-submissions/contact-{timestamp}.json`
- **Combined log**: `form-submissions/all-submissions.json`

## 🔍 **Viewing Submissions**

### Option 1: Terminal Command
```bash
node view-submissions.js
```

### Option 2: API Endpoint
```bash
curl http://localhost:3001/api/submissions
```

### Option 3: Web Interface
Visit `http://localhost:3001/api/submissions` in your browser

## 📊 **Form Fields**

The contact form includes:
- **Name** (required)
- **Email** (required, validated)
- **Phone** (required)
- **Message** (required)

## 🔧 **API Endpoints**

- `POST /api/contact` - Submit contact form
- `GET /api/submissions` - View all submissions
- `GET /api/health` - Health check

## 🌐 **Public Access**

Once ngrok is running, anyone can access your form at:
- **Website**: `https://your-ngrok-url.ngrok-free.app/`
- **API**: `https://your-ngrok-url.ngrok-free.app/api/*`

## 📝 **Example Submission Data**

```json
{
  "id": "1734708284123",
  "timestamp": "2025-08-20T16:04:44.123Z",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "message": "Looking forward to celebrating with you!",
  "ip": "192.168.1.100"
}
```

## 🔒 **Security Notes**

- The backend accepts requests from any origin (CORS enabled)
- Form data is stored locally on your computer
- No authentication required (for simplicity)
- Consider adding rate limiting for production use

## 🛠 **Troubleshooting**

### Server won't start
- Check if port 3001 is available
- Ensure all dependencies are installed: `npm install express cors`

### ngrok connection issues
- Kill existing ngrok processes: `pkill ngrok`
- Restart ngrok: `ngrok http 8080`
- Check ngrok status: `curl http://localhost:4040/api/tunnels`

### Form submissions not working
- Verify Vite proxy is configured in `vite.config.ts`
- Check browser console for CORS errors
- Ensure both frontend and backend servers are running

### Vite proxy issues
- Restart Vite dev server: `npm run dev`
- Check that proxy configuration is correct in `vite.config.ts`

## 🎯 **Current Status**

✅ **Backend Server**: Running on port 3001  
✅ **Frontend Server**: Running on port 8080 with API proxy  
✅ **Single ngrok Tunnel**: Active for both frontend and backend  
✅ **Form Integration**: Using relative URLs for API calls  
✅ **Data Storage**: Local JSON files  
✅ **Health Check**: Working through combined tunnel  

**Combined URL**: `https://b3249f77b30a.ngrok-free.app`

## 🎉 **Benefits of Combined Approach**

- ✅ **Single ngrok tunnel** (solves the 1-session limit)
- ✅ **Simpler setup** (no need to manage multiple tunnels)
- ✅ **Better performance** (no cross-origin requests)
- ✅ **Easier maintenance** (one URL to share)
- ✅ **Automatic proxy** (Vite handles API routing)

## 🚀 **How to Share**

Simply share this URL with people:
**`https://b3249f77b30a.ngrok-free.app`**

They can:
1. View your wedding website
2. Fill out the contact form
3. Submit messages that appear on your local computer
