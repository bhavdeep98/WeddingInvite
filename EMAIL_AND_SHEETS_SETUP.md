# Email Notifications & Google Sheets Integration Setup

This guide will help you set up email notifications and Google Sheets integration for your wedding RSVP system.

## 🎯 What You'll Get

- **Email notifications** sent to you for every RSVP submission
- **Confirmation emails** sent to guests who RSVP
- **Automatic Google Sheets updates** with all RSVP data
- **Real-time statistics** and analytics

---

## 📧 Part 1: Email Notifications Setup

### Step 1: Enable Gmail App Passwords

1. **Go to your Google Account**: [myaccount.google.com](https://myaccount.google.com)
2. **Enable 2-Step Verification** (if not already enabled):
   - Go to Security → 2-Step Verification
   - Follow the setup process
3. **Generate App Password**:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" as the app
   - Copy the 16-character password (save it securely!)

### Step 2: Configure Email Settings

1. **Copy the environment file**:
   ```bash
   cp env.example .env
   ```

2. **Edit the `.env` file** with your email settings:
   ```bash
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com           # Your Gmail address
   EMAIL_PASS=your-16-char-app-password      # The app password from Step 1
   EMAIL_FROM=your-email@gmail.com           # Same as EMAIL_USER
   NOTIFICATION_EMAIL=your-email@gmail.com   # Where you want to receive notifications
   ```

---

## 📊 Part 2: Google Sheets Integration Setup

### Step 1: Create a Google Cloud Project

1. **Go to Google Cloud Console**: [console.cloud.google.com](https://console.cloud.google.com)
2. **Create a new project** or select an existing one
3. **Enable the Google Sheets API**:
   - Go to APIs & Services → Library
   - Search for "Google Sheets API"
   - Click "Enable"

### Step 2: Create a Service Account

1. **Go to APIs & Services → Credentials**
2. **Click "Create Credentials" → Service Account**
3. **Fill in the details**:
   - Service account name: `wedding-rsvp-service`
   - Service account ID: (auto-generated)
   - Description: `Service account for wedding RSVP Google Sheets integration`
4. **Click "Create and Continue"**
5. **Skip the optional steps** and click "Done"

### Step 3: Generate Service Account Key

1. **Find your service account** in the credentials list
2. **Click on the service account email**
3. **Go to the "Keys" tab**
4. **Click "Add Key" → Create new key**
5. **Select "JSON" format** and click "Create"
6. **Download the JSON file** (keep it secure!)

### Step 4: Create Your Google Sheet

1. **Create a new Google Sheet**: [sheets.google.com](https://sheets.google.com)
2. **Name it**: "Wedding RSVP Responses" (or any name you prefer)
3. **Copy the Spreadsheet ID** from the URL:
   - URL: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
   - ID: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

### Step 5: Share the Sheet with Service Account

1. **Open your Google Sheet**
2. **Click the "Share" button**
3. **Add the service account email** (from the JSON file: `client_email`)
4. **Give it "Editor" permissions**
5. **Uncheck "Notify people"** and click "Share"

### Step 6: Configure Google Sheets Settings

1. **Open the downloaded JSON file** from Step 3
2. **Add these values to your `.env` file**:
   ```bash
   # Google Sheets Configuration
   GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id-from-step-4
   GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@your-project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
   ```

**⚠️ Important Notes:**
- The `GOOGLE_PRIVATE_KEY` should include the full key with `\\n` for line breaks
- Keep the quotes around the entire private key
- The service account email is the `client_email` from your JSON file

---

## 🔧 Part 3: Install Dependencies & Test

### Step 1: Install New Dependencies

```bash
# Navigate to your project directory
cd /path/to/your/WeddingInvitation

# Install the new packages
npm install nodemailer googleapis dotenv
```

### Step 2: Test Your Configuration

1. **Start your server**:
   ```bash
   node server.js
   ```

2. **Check the startup logs**:
   - Look for `✅ Google Sheets initialized successfully`
   - Look for configuration status in the logs

3. **Test the health endpoint**:
   ```bash
   curl http://localhost:3001/api/health
   ```
   
   You should see:
   ```json
   {
     "status": "OK",
     "emailConfigured": true,
     "googleSheetsConfigured": true
   }
   ```

### Step 3: Test with a Real RSVP

1. **Submit a test RSVP** through your website
2. **Check your email** for notifications
3. **Check your Google Sheet** for the new row
4. **Check server logs** for any error messages

---

## 📋 Part 4: What Gets Automated

### Email Notifications
- **To You**: Detailed RSVP information, guest count, dietary restrictions, etc.
- **To Guest**: Beautiful confirmation email with wedding details and next steps

### Google Sheets Updates
- **RSVP Sheet**: All RSVP responses with complete details
- **Contact Sheet**: Contact form submissions (if used)
- **Automatic formatting**: Headers, alternating row colors, etc.

### Analytics Endpoint
- **GET** `/api/rsvp-stats`: Returns attendance counts, guest totals, event attendance

---

## 🛠️ Troubleshooting

### Email Issues
- **Authentication Error**: Check your app password is correct
- **SMTP Error**: Verify `EMAIL_HOST` and `EMAIL_PORT` settings
- **No emails sent**: Check spam folder, verify `NOTIFICATION_EMAIL` is correct

### Google Sheets Issues
- **Authentication Error**: Verify service account email and private key
- **Permission Denied**: Ensure the sheet is shared with the service account
- **Sheet not found**: Double-check the `GOOGLE_SHEETS_SPREADSHEET_ID`

### General Issues
- **Check server logs** for detailed error messages
- **Verify `.env` file** is in the correct location and properly formatted
- **Test individual components** using the `/api/health` endpoint

---

## 📱 Optional: Additional Notifications

You can also add Slack or Discord webhook notifications by adding these to your `.env`:

```bash
# Optional: Additional notifications
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR/DISCORD/WEBHOOK
```

---

## 🎉 You're All Set!

Once configured, every RSVP submission will:
1. ✅ Save to local JSON files (backup)
2. 📧 Send you an email notification
3. 📧 Send the guest a confirmation email
4. 📊 Update your Google Sheet automatically
5. 📈 Provide real-time statistics

Your wedding planning just got a whole lot easier! 🎊
