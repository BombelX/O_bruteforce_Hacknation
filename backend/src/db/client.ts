import Database from "better-sqlite3";
import { drizzle, type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import fs from "node:fs";
import path from "node:path";
import { createHash } from 'crypto';

const dbFile = path.join(process.cwd(), "data", "app.db");
const dir = path.dirname(dbFile);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const sqlite = new Database(dbFile);
// Ensure tables exist (in case migrations are not used)
// sqlite.exec(`
// 	CREATE TABLE IF NOT EXISTS users (
// 		id INTEGER PRIMARY KEY AUTOINCREMENT,
// 		username TEXT NOT NULL,
// 		password TEXT NOT NULL
// 	);

// 	CREATE TABLE IF NOT EXISTS refresh_tokens (
// 		id INTEGER PRIMARY KEY AUTOINCREMENT,
// 		user_id INTEGER NOT NULL,
// 		token TEXT NOT NULL,
// 		expires_at TEXT NOT NULL,
// 		is_revoked INTEGER NOT NULL
// 	);
// `);
function generateSHA256(input: string): string {
    return createHash('sha256').update(input).digest('hex');
}
const userExists = sqlite.prepare('SELECT 1 FROM users LIMIT 1').get();
if (!userExists) {
	const insert = sqlite.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
	insert.run('mockUser1', generateSHA256('Password123'));
	insert.run('mockUser2', generateSHA256('Secret456'));
}

export const db: BetterSQLite3Database<typeof schema> = drizzle(sqlite, { schema });