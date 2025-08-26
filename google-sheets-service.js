import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Google Sheets API
const initGoogleSheets = () => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('❌ Error initializing Google Sheets:', error);
    return null;
  }
};

// Create or update spreadsheet headers
export const initializeSpreadsheet = async () => {
  try {
    const sheets = initGoogleSheets();
    if (!sheets) return { success: false, error: 'Failed to initialize Google Sheets' };

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    
    // Define headers for RSVP data
    const headers = [
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Attendance',
      'Guest Count',
      'Events Attending',
      'Dietary Restrictions',
      'Accommodation Help',
      'Special Requests',
      'Submission ID'
    ];

    // Get spreadsheet metadata to check existing sheets
    const spreadsheetInfo = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    // Check if RSVP sheet exists, if not create it
    let rsvpSheetId = null;
    const rsvpSheet = spreadsheetInfo.data.sheets.find(sheet => 
      sheet.properties.title === 'RSVP'
    );

    if (!rsvpSheet) {
      // Create RSVP sheet
      const addSheetResult = await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        resource: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: 'RSVP',
                },
              },
            },
          ],
        },
      });
      rsvpSheetId = addSheetResult.data.replies[0].addSheet.properties.sheetId;
      console.log('📊 Created RSVP worksheet');
    } else {
      rsvpSheetId = rsvpSheet.properties.sheetId;
    }

    // Check if headers exist in RSVP sheet
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'RSVP!A1:K1',
      });

      if (!response.data.values || response.data.values.length === 0) {
        // Add headers if they don't exist
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: 'RSVP!A1:K1',
          valueInputOption: 'RAW',
          resource: {
            values: [headers],
          },
        });

        // Format headers
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          resource: {
            requests: [
              {
                repeatCell: {
                  range: {
                    sheetId: rsvpSheetId,
                    startRowIndex: 0,
                    endRowIndex: 1,
                    startColumnIndex: 0,
                    endColumnIndex: headers.length,
                  },
                  cell: {
                    userEnteredFormat: {
                      backgroundColor: { red: 0.2, green: 0.6, blue: 1.0 },
                      textFormat: { foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 }, bold: true },
                    },
                  },
                  fields: 'userEnteredFormat(backgroundColor,textFormat)',
                },
              },
            ],
          },
        });

        console.log('📊 Google Sheets initialized with headers');
      }
    } catch (rangeError) {
      // If range still fails, the sheet might be completely empty
      console.log('📊 Setting up RSVP sheet headers...');
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'RSVP!A1:K1',
        valueInputOption: 'RAW',
        resource: {
          values: [headers],
        },
      });

      // Format headers
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        resource: {
          requests: [
            {
              repeatCell: {
                range: {
                  sheetId: rsvpSheetId,
                  startRowIndex: 0,
                  endRowIndex: 1,
                  startColumnIndex: 0,
                  endColumnIndex: headers.length,
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: { red: 0.2, green: 0.6, blue: 1.0 },
                    textFormat: { foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 }, bold: true },
                  },
                },
                fields: 'userEnteredFormat(backgroundColor,textFormat)',
              },
            },
          ],
        },
      });

      console.log('📊 Google Sheets headers added successfully');
    }

    return { success: true };
  } catch (error) {
    console.error('❌ Error initializing spreadsheet:', error);
    return { success: false, error: error.message };
  }
};

// Add RSVP data to Google Sheets
export const addRSVPToSheet = async (rsvpData) => {
  try {
    const sheets = initGoogleSheets();
    if (!sheets) return { success: false, error: 'Failed to initialize Google Sheets' };

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    
    // Prepare row data
    const rowData = [
      new Date(rsvpData.timestamp).toLocaleString(),
      rsvpData.name,
      rsvpData.email,
      rsvpData.phone,
      rsvpData.attendance.toUpperCase(),
      rsvpData.guestCount || 'N/A',
      Array.isArray(rsvpData.events) ? rsvpData.events.join(', ') : 'N/A',
      rsvpData.dietaryRestrictions || 'None',
      rsvpData.accommodation || 'No',
      rsvpData.specialRequests || 'None',
      rsvpData.id
    ];

    // Append data to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'RSVP!A:K',
      valueInputOption: 'RAW',
      resource: {
        values: [rowData],
      },
    });

    // Get the current number of rows to apply formatting to the new row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'RSVP!A:A',
    });

    const rowCount = response.data.values ? response.data.values.length : 1;

    // Apply alternating row colors for better readability
    if (rowCount > 1) {
      const isEvenRow = rowCount % 2 === 0;
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        resource: {
          requests: [
            {
              repeatCell: {
                range: {
                  sheetId: 0,
                  startRowIndex: rowCount - 1,
                  endRowIndex: rowCount,
                  startColumnIndex: 0,
                  endColumnIndex: 11,
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: isEvenRow 
                      ? { red: 0.95, green: 0.95, blue: 0.95 } 
                      : { red: 1.0, green: 1.0, blue: 1.0 },
                  },
                },
                fields: 'userEnteredFormat(backgroundColor)',
              },
            },
          ],
        },
      });
    }

    console.log(`📊 RSVP added to Google Sheets: ${rsvpData.name}`);
    return { success: true, row: rowCount };
    
  } catch (error) {
    console.error('❌ Error adding RSVP to Google Sheets:', error);
    return { success: false, error: error.message };
  }
};

// Add contact form data to Google Sheets
export const addContactToSheet = async (contactData) => {
  try {
    const sheets = initGoogleSheets();
    if (!sheets) return { success: false, error: 'Failed to initialize Google Sheets' };

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    
    // Get spreadsheet metadata to check existing sheets
    const spreadsheetInfo = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    // Check if Contact sheet exists, if not create it
    let contactSheetId = null;
    const contactSheet = spreadsheetInfo.data.sheets.find(sheet => 
      sheet.properties.title === 'Contact'
    );

    if (!contactSheet) {
      // Create Contact sheet
      const addSheetResult = await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        resource: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: 'Contact',
                },
              },
            },
          ],
        },
      });
      contactSheetId = addSheetResult.data.replies[0].addSheet.properties.sheetId;
      console.log('📊 Created Contact worksheet');
    } else {
      contactSheetId = contactSheet.properties.sheetId;
    }

    // Check if headers exist in Contact sheet
    const contactHeaders = ['Timestamp', 'Name', 'Email', 'Phone', 'Message', 'Submission ID'];
    
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Contact!A1:F1',
      });

      if (!response.data.values || response.data.values.length === 0) {
        // Add headers if they don't exist
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: 'Contact!A1:F1',
          valueInputOption: 'RAW',
          resource: {
            values: [contactHeaders],
          },
        });

        // Format headers
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          resource: {
            requests: [
              {
                repeatCell: {
                  range: {
                    sheetId: contactSheetId,
                    startRowIndex: 0,
                    endRowIndex: 1,
                    startColumnIndex: 0,
                    endColumnIndex: contactHeaders.length,
                  },
                  cell: {
                    userEnteredFormat: {
                      backgroundColor: { red: 0.2, green: 0.6, blue: 1.0 },
                      textFormat: { foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 }, bold: true },
                    },
                  },
                  fields: 'userEnteredFormat(backgroundColor,textFormat)',
                },
              },
            ],
          },
        });

        console.log('📊 Contact sheet headers added successfully');
      }
    } catch (rangeError) {
      // If range still fails, set up headers
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Contact!A1:F1',
        valueInputOption: 'RAW',
        resource: {
          values: [contactHeaders],
        },
      });

      // Format headers
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        resource: {
          requests: [
            {
              repeatCell: {
                range: {
                  sheetId: contactSheetId,
                  startRowIndex: 0,
                  endRowIndex: 1,
                  startColumnIndex: 0,
                  endColumnIndex: contactHeaders.length,
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: { red: 0.2, green: 0.6, blue: 1.0 },
                    textFormat: { foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 }, bold: true },
                  },
                },
                fields: 'userEnteredFormat(backgroundColor,textFormat)',
              },
            },
          ],
        },
      });

      console.log('📊 Contact sheet headers added successfully');
    }
    
    // Prepare row data
    const rowData = [
      new Date(contactData.timestamp).toLocaleString(),
      contactData.name,
      contactData.email,
      contactData.phone,
      contactData.message,
      contactData.id
    ];

    // Append data to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Contact!A:F',
      valueInputOption: 'RAW',
      resource: {
        values: [rowData],
      },
    });

    console.log(`📊 Contact form added to Google Sheets: ${contactData.name}`);
    return { success: true };
    
  } catch (error) {
    console.error('❌ Error adding contact to Google Sheets:', error);
    return { success: false, error: error.message };
  }
};

// Get RSVP statistics from Google Sheets
export const getRSVPStats = async () => {
  try {
    const sheets = initGoogleSheets();
    if (!sheets) return { success: false, error: 'Failed to initialize Google Sheets' };

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    
    // Get all RSVP data
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'RSVP!A2:K', // Skip header row
    });

    if (!response.data.values) {
      return { success: true, stats: { total: 0, attending: 0, notAttending: 0, maybe: 0, totalGuests: 0 } };
    }

    const data = response.data.values;
    const stats = {
      total: data.length,
      attending: 0,
      notAttending: 0,
      maybe: 0,
      totalGuests: 0,
      events: { haldi: 0, mehandi: 0, wedding: 0 }
    };

    data.forEach(row => {
      const attendance = row[4]?.toLowerCase();
      const guestCount = parseInt(row[5]) || 1;
      const events = row[6]?.toLowerCase() || '';

      if (attendance === 'yes') {
        stats.attending++;
        stats.totalGuests += guestCount;
        
        if (events.includes('haldi')) stats.events.haldi++;
        if (events.includes('mehandi')) stats.events.mehandi++;
        if (events.includes('wedding')) stats.events.wedding++;
      } else if (attendance === 'no') {
        stats.notAttending++;
      } else if (attendance === 'maybe') {
        stats.maybe++;
      }
    });

    return { success: true, stats };
    
  } catch (error) {
    console.error('❌ Error getting RSVP stats:', error);
    return { success: false, error: error.message };
  }
};
