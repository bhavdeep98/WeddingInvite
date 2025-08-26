import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendRSVPNotification, sendContactNotification } from './email-service.js';
import { initializeSpreadsheet, addRSVPToSheet, addContactToSheet, getRSVPStats } from './google-sheets-service.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API routes logging (simplified)
app.use('/api', (req, res, next) => {
  console.log(`API: ${req.method} ${req.originalUrl}`);
  next();
});

// Serve static files from the built frontend (after API routes)
app.use(express.static(path.join(__dirname, 'dist')));

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, 'form-submissions');
fs.mkdir(dataDir, { recursive: true }).catch(console.error);

// Initialize Google Sheets on startup
initializeSpreadsheet().then(result => {
  if (result.success) {
    console.log('✅ Google Sheets initialized successfully');
  } else {
    console.log('⚠️  Google Sheets initialization failed:', result.error);
    console.log('📝 RSVPs will still be saved locally');
  }
}).catch(console.error);

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ 
        error: 'All fields are required' 
      });
    }

    // Create submission object with timestamp
    const submission = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      message: message.trim(),
      ip: req.ip || req.connection.remoteAddress
    };

    // Save to file
    const filename = `contact-${Date.now()}.json`;
    const filepath = path.join(dataDir, filename);
    
    await fs.writeFile(filepath, JSON.stringify(submission, null, 2));
    
    // Also append to a combined log file
    const logFile = path.join(dataDir, 'all-submissions.json');
    let allSubmissions = [];
    
    try {
      const existingData = await fs.readFile(logFile, 'utf8');
      allSubmissions = JSON.parse(existingData);
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
    }
    
    allSubmissions.push(submission);
    await fs.writeFile(logFile, JSON.stringify(allSubmissions, null, 2));

    console.log('📧 New contact form submission:', {
      name: submission.name,
      email: submission.email,
      timestamp: submission.timestamp
    });

    // Send email notification (async, don't wait)
    sendContactNotification(submission).catch(error => {
      console.error('Email notification failed:', error);
    });

    // Add to Google Sheets (async, don't wait)
    addContactToSheet(submission).catch(error => {
      console.error('Google Sheets update failed:', error);
    });

    res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully',
      id: submission.id
    });

  } catch (error) {
    console.error('❌ Error processing form submission:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Get all submissions (for viewing data)
app.get('/api/submissions', async (req, res) => {
  try {
    const logFile = path.join(dataDir, 'all-submissions.json');
    const data = await fs.readFile(logFile, 'utf8');
    const submissions = JSON.parse(data);
    
    res.json({ submissions });
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.json({ submissions: [] });
    } else {
      console.error('Error reading submissions:', error);
      res.status(500).json({ error: 'Failed to read submissions' });
    }
  }
});

// RSVP form endpoint
app.post('/api/rsvp', async (req, res) => {
  try {
    const { name, email, phone, attendance, guestCount, events, dietaryRestrictions, accommodation, specialRequests } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !attendance) {
      return res.status(400).json({ 
        error: 'Name, email, phone, and attendance are required' 
      });
    }

    // Create submission object with timestamp
    const submission = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      attendance,
      guestCount: guestCount || '1',
      events: events || [],
      dietaryRestrictions: dietaryRestrictions?.trim() || '',
      accommodation: accommodation || 'no',
      specialRequests: specialRequests?.trim() || '',
      ip: req.ip || req.connection.remoteAddress
    };

    // Save to file
    const filename = `rsvp-${Date.now()}.json`;
    const filepath = path.join(dataDir, filename);
    
    await fs.writeFile(filepath, JSON.stringify(submission, null, 2));
    
    // Also append to a combined RSVP log file
    const logFile = path.join(dataDir, 'all-rsvps.json');
    let allRSVPs = [];
    
    try {
      const existingData = await fs.readFile(logFile, 'utf8');
      allRSVPs = JSON.parse(existingData);
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
    }
    
    allRSVPs.push(submission);
    await fs.writeFile(logFile, JSON.stringify(allRSVPs, null, 2));

    console.log('🎉 New RSVP submission:', {
      name: submission.name,
      email: submission.email,
      attendance: submission.attendance,
      guestCount: submission.guestCount,
      events: submission.events,
      timestamp: submission.timestamp
    });

    // Send email notifications (async, don't wait)
    sendRSVPNotification(submission).catch(error => {
      console.error('Email notification failed:', error);
    });

    // Add to Google Sheets (async, don't wait)
    addRSVPToSheet(submission).catch(error => {
      console.error('Google Sheets update failed:', error);
    });

    res.status(200).json({ 
      success: true, 
      message: 'RSVP submitted successfully',
      id: submission.id
    });

  } catch (error) {
    console.error('❌ Error processing RSVP submission:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Get all RSVPs (for viewing data)
app.get('/api/rsvps', async (req, res) => {
  try {
    const logFile = path.join(dataDir, 'all-rsvps.json');
    const data = await fs.readFile(logFile, 'utf8');
    const rsvps = JSON.parse(data);
    
    res.json({ rsvps });
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.json({ rsvps: [] });
    } else {
      console.error('Error reading RSVPs:', error);
      res.status(500).json({ error: 'Failed to read RSVPs' });
    }
  }
});

// Get RSVP statistics endpoint
app.get('/api/rsvp-stats', async (req, res) => {
  try {
    const stats = await getRSVPStats();
    if (stats.success) {
      res.json(stats.stats);
    } else {
      res.status(500).json({ error: 'Failed to get RSVP stats' });
    }
  } catch (error) {
    console.error('Error getting RSVP stats:', error);
    res.status(500).json({ error: 'Failed to get RSVP stats' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
    googleSheetsConfigured: !!(process.env.GOOGLE_SHEETS_SPREADSHEET_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
  });
});

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } catch (error) {
    console.error('Error serving frontend:', error);
    res.status(500).send('Error loading page');
  }
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Form submission server running on http://localhost:${PORT}`);
  console.log(`📁 Submissions will be saved to: ${dataDir}`);
  console.log(`🔗 API endpoints:`);
  console.log(`   POST /api/contact - Submit contact form`);
  console.log(`   GET  /api/submissions - View all submissions`);
  console.log(`   POST /api/rsvp - Submit RSVP form`);
  console.log(`   GET  /api/rsvps - View all RSVPs`);
  console.log(`   GET  /api/rsvp-stats - Get RSVP statistics`);
  console.log(`   GET  /api/health - Health check`);
  
  console.log(`\n🔧 Configuration:`);
  console.log(`   📧 Email notifications: ${process.env.EMAIL_USER ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`   📊 Google Sheets: ${process.env.GOOGLE_SHEETS_SPREADSHEET_ID ? '✅ Configured' : '❌ Not configured'}`);
});

// Error handling for the server
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
