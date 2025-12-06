const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const dbFile = path.join(process.cwd(), 'data', 'app.db');
if (!fs.existsSync(dbFile)) {
  console.log('No DB file:', dbFile);
  process.exit(0);
}
const db = new Database(dbFile, { readonly: true });
try {
  const rows = db.prepare('SELECT id, username, password FROM users').all();
  if (!rows || rows.length === 0) {
    console.log('No users found');
  } else {
    console.log('Users:');
    console.table(rows);
  }
} catch (err) {
  console.error('Error querying users:', err.message);
}
db.close();
