import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function viewSubmissions() {
  try {
    const dataDir = path.join(__dirname, 'form-submissions');
    const logFile = path.join(dataDir, 'all-submissions.json');
    
    const data = await fs.readFile(logFile, 'utf8');
    const submissions = JSON.parse(data);
    
    console.log('\n📧 Contact Form Submissions:');
    console.log('=' .repeat(50));
    
    if (submissions.length === 0) {
      console.log('No submissions yet.');
      return;
    }
    
    submissions.forEach((submission, index) => {
      console.log(`\n${index + 1}. ${submission.name} (${submission.email})`);
      console.log(`   📞 Phone: ${submission.phone}`);
      console.log(`   📅 Date: ${new Date(submission.timestamp).toLocaleString()}`);
      console.log(`   💬 Message: ${submission.message.substring(0, 100)}${submission.message.length > 100 ? '...' : ''}`);
      console.log(`   🌐 IP: ${submission.ip}`);
      console.log('-'.repeat(30));
    });
    
    console.log(`\nTotal submissions: ${submissions.length}`);
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('No submissions file found. No submissions yet.');
    } else {
      console.error('Error reading submissions:', error);
    }
  }
}

// Run if called directly
viewSubmissions();
