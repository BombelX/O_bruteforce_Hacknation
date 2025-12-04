import express from 'express';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const app = express();
const port = Number(process.env.PORT ?? 3000);

const sqliteFile = process.env.SQLITE_FILE ?? 'dev.sqlite';
const sqlite = new Database(sqliteFile);
const db = drizzle({ client: sqlite });

app.get('/', (req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});

export { db };
