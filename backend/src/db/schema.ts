import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { email, string } from "zod";
import { Logger, LoggerConfig } from "log4ts";


export const users = sqliteTable('users',
    {
        id: int('id').primaryKey(),
        username: text().notNull(),
        password: text().notNull(),
    }
)
export const refresh_tokens = sqliteTable('refresh_tokens', {
    id: int('id').primaryKey(),
    user_id: int('user_id').notNull(),
    token: text('token').notNull(),
    expires_at: text('expires_at').notNull(),
    is_revoked: int('is_revoked').notNull(),
})