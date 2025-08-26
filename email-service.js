import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send RSVP notification email
export const sendRSVPNotification = async (rsvpData) => {
  try {
    const transporter = createTransporter();
    
    // Email to you (notification)
    const eventsText = Array.isArray(rsvpData.events) ? rsvpData.events.join(', ') : 'None selected';
    const guestDetails = (rsvpData.attendance === 'yes' || rsvpData.attendance === 'maybe') 
      ? `<p><strong>Number of Guests:</strong> ${rsvpData.guestCount}</p>
         <p><strong>Events Attending:</strong> ${eventsText}</p>` 
      : '';
    
    const additionalDetails = (rsvpData.attendance === 'yes' || rsvpData.attendance === 'maybe') ? `
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <h4 style="color: #6366f1; margin: 0 0 10px 0;">Additional Details</h4>
          ${rsvpData.dietaryRestrictions ? `<p><strong>Dietary Restrictions:</strong> ${rsvpData.dietaryRestrictions}</p>` : ''}
          ${rsvpData.accommodation && rsvpData.accommodation !== 'no' ? `<p><strong>Accommodation Help:</strong> ${rsvpData.accommodation}</p>` : ''}
          ${rsvpData.specialRequests ? `<p><strong>Special Requests:</strong> ${rsvpData.specialRequests}</p>` : ''}
        </div>` : '';

    const notificationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8B5CF6; text-align: center;">🎉 New Wedding RSVP Received!</h2>
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="margin: 0 0 15px 0;">Guest Information</h3>
          <p><strong>Name:</strong> ${rsvpData.name}</p>
          <p><strong>Email:</strong> ${rsvpData.email}</p>
          <p><strong>Phone:</strong> ${rsvpData.phone}</p>
          <p><strong>Attendance:</strong> ${rsvpData.attendance.toUpperCase()}</p>
          ${guestDetails}
        </div>
        
        ${additionalDetails}
        
        <div style="text-align: center; margin: 20px 0; padding: 15px; background: #fef3c7; border-radius: 8px;">
          <p style="margin: 0; color: #92400e;">
            <strong>Submitted:</strong> ${new Date(rsvpData.timestamp).toLocaleString()}
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #6b7280;">
          <p>This RSVP was automatically generated from your wedding website.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `🎉 New RSVP: ${rsvpData.name} - ${rsvpData.attendance.toUpperCase()}`,
      html: notificationHtml,
    });

    // Confirmation email to guest
    const statusMessage = rsvpData.attendance === 'yes' 
      ? `<div style="background: #dcfce7; border-left: 4px solid #16a34a; padding: 15px; margin: 20px 0;">
           <h4 style="color: #16a34a; margin: 0 0 10px 0;">🎉 We Can't Wait to See You!</h4>
           <p style="color: #166534; margin: 0;">Thank you for being part of our special celebration. We'll be in touch with more details about the venue, timing, and any other important information.</p>
         </div>`
      : rsvpData.attendance === 'no' 
      ? `<div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0;">
           <h4 style="color: #dc2626; margin: 0 0 10px 0;">💙 We'll Miss You</h4>
           <p style="color: #7f1d1d; margin: 0;">We're sorry you can't make it, but we understand. We'll be thinking of you on our special day!</p>
         </div>`
      : `<div style="background: #fefce8; border-left: 4px solid #ca8a04; padding: 15px; margin: 20px 0;">
           <h4 style="color: #ca8a04; margin: 0 0 10px 0;">🤔 Let Us Know Soon!</h4>
           <p style="color: #713f12; margin: 0;">No worries about being unsure! Please let us know your final decision by October 1st, 2025, so we can plan accordingly.</p>
         </div>`;

    const guestConfirmationDetails = (rsvpData.attendance === 'yes' || rsvpData.attendance === 'maybe') 
      ? `<p><strong>Number of Guests:</strong> ${rsvpData.guestCount}</p>
         <p><strong>Events:</strong> ${eventsText}</p>` 
      : '';

    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #8B5CF6;">Thank You for Your RSVP!</h2>
          <p style="font-size: 18px; color: #6b7280;">We're excited to celebrate with you</p>
        </div>
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 15px; margin: 20px 0;">
          <h3 style="margin: 0 0 20px 0; text-align: center;">🎊 Bhavdeep & Ramandeep's Wedding 🎊</h3>
          
          <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;">
            <h4 style="margin: 0 0 10px 0;">Your RSVP Details:</h4>
            <p><strong>Name:</strong> ${rsvpData.name}</p>
            <p><strong>Attendance:</strong> ${rsvpData.attendance.toUpperCase()}</p>
            ${guestConfirmationDetails}
          </div>
        </div>
        
        ${statusMessage}
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h4 style="color: #6366f1; margin: 0 0 15px 0;">📅 Wedding Events</h4>
          <div style="margin-bottom: 10px;">
            <strong>🎉 Haldi Ceremony</strong><br>
            <span style="color: #6b7280;">October 25, 2025 - Traditional turmeric ceremony</span>
          </div>
          <div style="margin-bottom: 10px;">
            <strong>🎨 Mehandi Ceremony</strong><br>
            <span style="color: #6b7280;">October 25, 2025 - Beautiful henna designs</span>
          </div>
          <div>
            <strong>💍 Wedding Ceremony</strong><br>
            <span style="color: #6b7280;">October 26, 2025 - Main wedding celebration</span>
          </div>
        </div>
        
        <div style="text-align: center; margin: 30px 0; padding: 20px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); border-radius: 10px;">
          <p style="color: white; font-size: 18px; margin: 0 0 10px 0;">
            <strong>"Sarbat Da Bhala"</strong>
          </p>
          <p style="color: white; margin: 0; opacity: 0.9;">
            May everyone prosper and be blessed
          </p>
        </div>
        
        <div style="text-align: center; color: #6b7280; margin-top: 20px;">
          <p>With love and excitement,<br><strong>Bhavdeep & Ramandeep</strong></p>
          <p style="font-size: 14px;">If you have any questions, please don't hesitate to contact us.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: rsvpData.email,
      subject: `✨ RSVP Confirmation - Bhavdeep & Ramandeep's Wedding`,
      html: confirmationHtml,
    });

    console.log(`📧 Email notifications sent for RSVP: ${rsvpData.name}`);
    return { success: true };
    
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send contact form notification (existing functionality)
export const sendContactNotification = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const notificationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8B5CF6; text-align: center;">💌 New Contact Form Message</h2>
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="margin: 0 0 15px 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Phone:</strong> ${contactData.phone}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <h4 style="color: #6366f1; margin: 0 0 10px 0;">Message</h4>
          <p style="white-space: pre-wrap;">${contactData.message}</p>
        </div>
        
        <div style="text-align: center; margin: 20px 0; padding: 15px; background: #fef3c7; border-radius: 8px;">
          <p style="margin: 0; color: #92400e;">
            <strong>Submitted:</strong> ${new Date(contactData.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `💌 New Contact: ${contactData.name}`,
      html: notificationHtml,
    });

    console.log(`📧 Contact notification sent for: ${contactData.name}`);
    return { success: true };
    
  } catch (error) {
    console.error('❌ Error sending contact email:', error);
    return { success: false, error: error.message };
  }
};