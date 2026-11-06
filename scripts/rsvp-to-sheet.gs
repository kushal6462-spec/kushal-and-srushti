const HEADERS = [
  'Submitted at',
  'Name',
  'Phone',
  'Normalized phone',
  'Attending',
  'Number of guests',
  'Arrival date',
  'Arrival time',
  'Departure date',
  'Departure time',
  'Message',
];

function doPost(e) {
  let settings;
  let submission;

  try {
    settings = getSettings_();
    submission = validateSubmission_(e);
  } catch (error) {
    console.error(error);

    return jsonResponse_({ ok: false, code: 'invalid_submission_or_config' });
  }

  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(30000);
  } catch (error) {
    console.error(error);

    return jsonResponse_({ ok: false, code: 'busy' });
  }

  let savedResponse;

  try {
    const sheet = SpreadsheetApp.openById(settings.sheetId).getSheets()[0];
    const headers = ensureHeaders_(sheet);
    const headerIndexes = getHeaderIndexes_(headers);
    const existingRow = findExistingRow_(sheet, headerIndexes, submission.normalizedPhone);
    const values = {
      'Submitted at': new Date().toISOString(),
      Name: submission.name,
      Phone: submission.phone,
      'Normalized phone': submission.normalizedPhone,
      Attending: submission.attendance,
      'Number of guests': submission.extraGuests,
      'Arrival date': submission.arrivalDate,
      'Arrival time': submission.arrivalTime,
      'Departure date': submission.departureDate,
      'Departure time': submission.departureTime,
      Message: submission.message,
    };
    const row = existingRow
      ? sheet.getRange(existingRow, 1, 1, headers.length).getValues()[0]
      : new Array(headers.length).fill('');

    Object.keys(values).forEach((header) => {
      row[headerIndexes[header]] = safeSheetValue_(values[header]);
    });

    if (existingRow) {
      sheet.getRange(existingRow, 1, 1, headers.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }

    SpreadsheetApp.flush();
    savedResponse = { ok: true, saved: true, updated: Boolean(existingRow) };
  } catch (error) {
    console.error(error);

    return jsonResponse_({ ok: false, code: 'save_failed' });
  } finally {
    lock.releaseLock();
  }

  try {
    MailApp.sendEmail({
      to: settings.recipients.join(','),
      subject: `Wedding RSVP: ${submission.name.replace(/[\r\n]/g, ' ').slice(0, 100)}`,
      body: buildNotification_(submission, savedResponse.updated),
    });
  } catch (error) {
    console.error(error);

    return jsonResponse_({
      ok: false,
      saved: true,
      notificationSent: false,
      code: 'notification_failed',
    });
  }

  savedResponse.notificationSent = true;

  return jsonResponse_(savedResponse);
}

function authorizeRsvpBackend() {
  const settings = getSettings_();
  SpreadsheetApp.openById(settings.sheetId).getSheets()[0].getName();
  MailApp.getRemainingDailyQuota();
}

function getSettings_() {
  const properties = PropertiesService.getScriptProperties();
  const sheetId = String(properties.getProperty('RSVP_SHEET_ID') || '').trim();
  const recipients = String(
    properties.getProperty('RSVP_NOTIFICATION_RECIPIENTS') || ''
  )
    .split(/[;,\s]+/)
    .map((email) => email.trim())
    .filter(Boolean);

  if (!sheetId || recipients.length !== 2) {
    throw new Error('Set RSVP_SHEET_ID and both RSVP_NOTIFICATION_RECIPIENTS.');
  }

  return { sheetId, recipients };
}

function validateSubmission_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Missing request body.');
  }

  const body = JSON.parse(e.postData.contents);
  const name = String(body.name || '').trim();
  const phone = String(body.phone || '').trim();
  const normalizedPhone = normalizePhone_(phone);
  const attendance = String(body.attendance || '').trim().toLowerCase();
  const guestCountText = String(body.extraGuests ?? '').trim();
  const extraGuests = guestCountText === '' ? '' : Number(guestCountText);

  if (!name || name.length > 150) throw new Error('Invalid name.');
  if (normalizedPhone.length < 7 || normalizedPhone.length > 15) {
    throw new Error('Invalid phone number.');
  }
  if (attendance !== 'yes' && attendance !== 'no') {
    throw new Error('Invalid attendance value.');
  }
  if (
    guestCountText !== '' &&
    (!Number.isInteger(extraGuests) || extraGuests < 0 || extraGuests > 20)
  ) {
    throw new Error('Invalid number of guests.');
  }

  const arrivalDate = optionalValue_(body.arrivalDate, 10, 'arrival date');
  const arrivalTime = optionalValue_(body.arrivalTime, 5, 'arrival time');
  const departureDate = optionalValue_(body.departureDate, 10, 'departure date');
  const departureTime = optionalValue_(body.departureTime, 5, 'departure time');
  const message = optionalValue_(body.message, 2000, 'message');

  if (arrivalDate && !/^\d{4}-\d{2}-\d{2}$/.test(arrivalDate)) {
    throw new Error('Invalid arrival date.');
  }
  if (departureDate && !/^\d{4}-\d{2}-\d{2}$/.test(departureDate)) {
    throw new Error('Invalid departure date.');
  }
  if (arrivalTime && !/^([01]\d|2[0-3]):[0-5]\d$/.test(arrivalTime)) {
    throw new Error('Invalid arrival time.');
  }
  if (departureTime && !/^([01]\d|2[0-3]):[0-5]\d$/.test(departureTime)) {
    throw new Error('Invalid departure time.');
  }

  return {
    name,
    phone,
    normalizedPhone,
    attendance,
    extraGuests,
    arrivalDate,
    arrivalTime,
    departureDate,
    departureTime,
    message,
  };
}

function optionalValue_(value, maxLength, label) {
  const result = String(value || '').trim();
  if (result.length > maxLength) throw new Error(`Invalid ${label}.`);

  return result;
}

function normalizePhone_(phone) {
  return String(phone || '').replace(/\D/g, '');
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);

    return HEADERS.slice();
  }

  const columnCount = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet
    .getRange(1, 1, 1, columnCount)
    .getDisplayValues()[0]
    .map((header) => String(header).trim());

  if (headers.every((header) => !header)) {
    headers.splice(0, headers.length, ...HEADERS);
  } else {
    const guestCountIndex = headers.indexOf('People coming with them');
    if (guestCountIndex !== -1) headers[guestCountIndex] = 'Number of guests';

    HEADERS.forEach((header) => {
      if (!headers.includes(header)) headers.push(header);
    });
  }

  if (sheet.getMaxColumns() < headers.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
  }
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  return headers;
}

function getHeaderIndexes_(headers) {
  return headers.reduce((indexes, header, index) => {
    indexes[header] = index;

    return indexes;
  }, {});
}

function findExistingRow_(sheet, headerIndexes, normalizedPhone) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;

  const rows = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
  const normalizedColumn = headerIndexes['Normalized phone'];
  const phoneColumn = headerIndexes.Phone;

  for (let index = 0; index < rows.length; index++) {
    const storedNormalized = String(rows[index][normalizedColumn] || '').trim();
    const storedPhone = String(rows[index][phoneColumn] || '').trim();
    const candidate = storedNormalized || normalizePhone_(storedPhone);
    if (candidate === normalizedPhone) return index + 2;
  }

  return 0;
}

function safeSheetValue_(value) {
  if (typeof value === 'string' && /^[=+\-@]/.test(value)) return `'${value}`;

  return value;
}

function buildNotification_(submission, updated) {
  return [
    `A guest RSVP was ${updated ? 'updated' : 'saved'}.`,
    '',
    `Name: ${submission.name}`,
    `Phone: ${submission.phone}`,
    `Attendance: ${submission.attendance}`,
    `Number of guests: ${submission.extraGuests === '' ? 'Not provided' : submission.extraGuests}`,
    `Message: ${submission.message || 'None'}`,
    `Arrival: ${submission.arrivalDate || 'Not provided'} ${submission.arrivalTime}`.trim(),
    `Departure: ${submission.departureDate || 'Not provided'} ${submission.departureTime}`.trim(),
  ].join('\n');
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
