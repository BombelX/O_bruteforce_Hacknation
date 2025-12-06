"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh_tokens = exports.users = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
exports.users = (0, sqlite_core_1.sqliteTable)('users', {
    id: (0, sqlite_core_1.int)('id').primaryKey(),
    username: (0, sqlite_core_1.text)().notNull(),
    password: (0, sqlite_core_1.text)().notNull(),
});
exports.refresh_tokens = (0, sqlite_core_1.sqliteTable)('refresh_tokens', {
    id: (0, sqlite_core_1.int)('id').primaryKey(),
    user_id: (0, sqlite_core_1.int)('user_id').notNull(),
    token: (0, sqlite_core_1.text)('token').notNull(),
    expires_at: (0, sqlite_core_1.text)('expires_at').notNull(),
    is_revoked: (0, sqlite_core_1.int)('is_revoked').notNull(),
});
