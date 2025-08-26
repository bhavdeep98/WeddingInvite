#!/bin/bash

# Wedding RSVP Integration Setup Script
# This script installs dependencies and helps configure email and Google Sheets integration

echo "🎉 Setting up Wedding RSVP Email & Google Sheets Integration"
echo "============================================================="

# Check if we're in the right directory
if [ ! -f "server.js" ]; then
    echo "❌ Error: Please run this script from your WeddingInvitation directory"
    exit 1
fi

echo ""
echo "📦 Installing required dependencies..."

# Install dependencies
npm install nodemailer googleapis dotenv

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies. Please check your npm installation."
    exit 1
fi

echo ""
echo "🔧 Setting up environment configuration..."

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    if [ -f "env.example" ]; then
        cp env.example .env
        echo "✅ Created .env file from example"
    else
        echo "⚠️  env.example file not found. Creating basic .env file..."
        cat > .env << EOF
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
NOTIFICATION_EMAIL=your-notification-email@gmail.com

# Google Sheets Configuration
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key\n-----END PRIVATE KEY-----\n"
EOF
        echo "✅ Created basic .env file"
    fi
else
    echo "ℹ️  .env file already exists"
fi

echo ""
echo "📋 Next Steps:"
echo "============="
echo ""
echo "1. 📧 Set up Email Notifications:"
echo "   - Enable 2-Step Verification in your Google Account"
echo "   - Generate an App Password for Gmail"
echo "   - Edit .env file with your email credentials"
echo ""
echo "2. 📊 Set up Google Sheets Integration:"
echo "   - Create a Google Cloud Project"
echo "   - Enable Google Sheets API"
echo "   - Create a Service Account and download JSON key"
echo "   - Create a Google Sheet and share it with the service account"
echo "   - Add Google Sheets configuration to .env file"
echo ""
echo "3. 🧪 Test Your Setup:"
echo "   - Run: node server.js"
echo "   - Check: curl http://localhost:3001/api/health"
echo "   - Submit a test RSVP"
echo ""
echo "📖 For detailed setup instructions, see:"
echo "   📄 EMAIL_AND_SHEETS_SETUP.md"
echo ""
echo "🚀 Once configured, your RSVP system will:"
echo "   ✅ Send email notifications for every RSVP"
echo "   ✅ Send confirmation emails to guests"
echo "   ✅ Automatically update Google Sheets"
echo "   ✅ Provide real-time statistics"
echo ""
echo "🎊 Happy wedding planning!"
