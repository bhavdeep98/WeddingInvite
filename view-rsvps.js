import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, 'form-submissions');
const rsvpFile = path.join(dataDir, 'all-rsvps.json');

async function viewRSVPs() {
  try {
    console.log('🎉 Wedding RSVP Submissions');
    console.log('===========================\n');
    
    const data = await fs.readFile(rsvpFile, 'utf8');
    const rsvps = JSON.parse(data);
    
    if (rsvps.length === 0) {
      console.log('No RSVP submissions yet.');
      return;
    }

    console.log(`Total RSVPs: ${rsvps.length}\n`);
    
    // Summary statistics
    const attendingYes = rsvps.filter(r => r.attendance === 'yes').length;
    const attendingNo = rsvps.filter(r => r.attendance === 'no').length;
    const attendingMaybe = rsvps.filter(r => r.attendance === 'maybe').length;
    
    console.log('📊 RSVP Summary:');
    console.log(`✅ Attending: ${attendingYes}`);
    console.log(`❌ Not Attending: ${attendingNo}`);
    console.log(`🤔 Maybe: ${attendingMaybe}\n`);
    
    // Guest count
    const totalGuests = rsvps
      .filter(r => r.attendance === 'yes')
      .reduce((sum, r) => sum + parseInt(r.guestCount || '1'), 0);
    console.log(`👥 Total Confirmed Guests: ${totalGuests}\n`);
    
    // Event attendance
    const eventCounts = {
      haldi: 0,
      mehandi: 0,
      wedding: 0
    };
    
    rsvps.forEach(rsvp => {
      if (Array.isArray(rsvp.events)) {
        rsvp.events.forEach(event => {
          if (eventCounts.hasOwnProperty(event)) {
            eventCounts[event]++;
          }
        });
      }
    });
    
    console.log('🎊 Event Attendance:');
    console.log(`Haldi Ceremony: ${eventCounts.haldi} people`);
    console.log(`Mehandi Ceremony: ${eventCounts.mehandi} people`);
    console.log(`Wedding Ceremony: ${eventCounts.wedding} people\n`);
    
    // Individual RSVPs
    console.log('📝 Individual RSVPs:');
    console.log('===================\n');
    
    rsvps.forEach((rsvp, index) => {
      console.log(`${index + 1}. ${rsvp.name}`);
      console.log(`   Email: ${rsvp.email}`);
      console.log(`   Phone: ${rsvp.phone}`);
      console.log(`   Attendance: ${rsvp.attendance}`);
      console.log(`   Guests: ${rsvp.guestCount}`);
      console.log(`   Events: ${Array.isArray(rsvp.events) ? rsvp.events.join(', ') : 'None selected'}`);
      console.log(`   Submitted: ${new Date(rsvp.timestamp).toLocaleString()}`);
      
      if (rsvp.dietaryRestrictions) {
        console.log(`   Dietary: ${rsvp.dietaryRestrictions}`);
      }
      
      if (rsvp.accommodation && rsvp.accommodation !== 'no') {
        console.log(`   Accommodation: ${rsvp.accommodation}`);
      }
      
      if (rsvp.specialRequests) {
        console.log(`   Special Requests: ${rsvp.specialRequests}`);
      }
      
      console.log('');
    });
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('No RSVP file found. No submissions yet.');
    } else {
      console.error('Error reading RSVP file:', error);
    }
  }
}

viewRSVPs();
