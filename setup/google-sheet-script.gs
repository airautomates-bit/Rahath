// Paste this into the Google Sheet: Extensions → Apps Script.
// It adds one row to the sheet for every call request from the website.
// The website's server sends the password below with each request, so
// nobody else can add rows.

// Change this to the same long password you put in Vercel as SHEET_SECRET.
const SECRET = "PASTE-THE-SAME-PASSWORD-AS-VERCEL";

const HEADINGS = ["Received", "Name", "Phone", "Package", "People", "Call day", "Call time", "Note", "Status"];

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (error) {
    return reply({ ok: false });
  }

  if (data.secret !== SECRET) {
    return reply({ ok: false });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADINGS);
      sheet.getRange(1, 1, 1, HEADINGS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // A leading ' stops Sheets treating "+94..." or "=..." as a formula.
    const text = (value) => "'" + String(value || "");
    sheet.appendRow([
      data.received,
      text(data.fullName),
      text(data.phoneNumber),
      data.packageType,
      text(data.travellerCount),
      data.callDay,
      data.callTime,
      text(data.message),
      "New",
    ]);
  } finally {
    lock.releaseLock();
  }

  return reply({ ok: true });
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
