"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const better_sqlite3_2 = require("drizzle-orm/better-sqlite3");
const schema = __importStar(require("./schema"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const crypto_1 = require("crypto");
const dbFile = node_path_1.default.join(process.cwd(), "data", "app.db");
const dir = node_path_1.default.dirname(dbFile);
if (!node_fs_1.default.existsSync(dir))
    node_fs_1.default.mkdirSync(dir, { recursive: true });
const sqlite = new better_sqlite3_1.default(dbFile);
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
function generateSHA256(input) {
    return (0, crypto_1.createHash)('sha256').update(input).digest('hex');
}
// Insert two mock users if they don't already exist
const userExists = sqlite.prepare('SELECT 1 FROM users LIMIT 1').get();
if (!userExists) {
    const insert = sqlite.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    insert.run('mockUser1', generateSHA256('Password123'));
    insert.run('mockUser2', generateSHA256('Secret456'));
}
exports.db = (0, better_sqlite3_2.drizzle)(sqlite, { schema });
