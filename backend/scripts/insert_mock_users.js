const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const { createHash } = require('crypto');
const dbFile = path.join(process.cwd(), 'data', 'app.db');
if (!fs.existsSync(dbFile)) {
  console.log('No DB file:', dbFile);
  process.exit(1);
}
const db = new Database(dbFile);
function sha(input){ return createHash('sha256').update(input).digest('hex'); }
try{
  const insert = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
  insert.run('mockUser1', sha('Password123'));
  insert.run('mockUser2', sha('Secret456'));
  console.log('Inserted mockUser1 and mockUser2');
} catch (err){
  console.error('Error inserting users:', err.message);
}
db.close();
