import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Basic middleware
app.use(cors());
app.use(express.json());

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, 'form-submissions');
fs.mkdir(dataDir, { recursive: true }).catch(console.error);

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Simple contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const submission = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      message: message.trim()
    };

    const filename = `contact-${Date.now()}.json`;
    const filepath = path.join(dataDir, filename);
    await fs.writeFile(filepath, JSON.stringify(submission, null, 2));

    res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully',
      id: submission.id
    });

  } catch (error) {
    console.error('Error processing contact submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Simple RSVP endpoint
app.post('/api/rsvp', async (req, res) => {
  try {
    const { name, email, phone, attendance } = req.body;
    
    if (!name || !email || !phone || !attendance) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const submission = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      attendance
    };

    const filename = `rsvp-${Date.now()}.json`;
    const filepath = path.join(dataDir, filename);
    await fs.writeFile(filepath, JSON.stringify(submission, null, 2));

    res.status(200).json({ 
      success: true, 
      message: 'RSVP submitted successfully',
      id: submission.id
    });

  } catch (error) {
    console.error('Error processing RSVP submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Simple server running on http://localhost:${PORT}`);
  console.log(`📁 Submissions will be saved to: ${dataDir}`);
});

// Error handling
server.on('error', (error) => {
  console.error('❌ Server error:', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
