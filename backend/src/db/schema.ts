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

export const categories = sqliteTable('categories', {
    id: int('id').primaryKey(),
    name: text('name').notNull(),
});

export const subcategories = sqliteTable('subcategories', {
    id: int('id').primaryKey(),
    category_id: int('category_id').notNull(),
    name: text('name').notNull(),
});

export const items = sqliteTable('items', {
    id: int('id').primaryKey(),
    category_id: int('category_id').notNull(),
    where_found: text('where_found').notNull(),
    found_date: text('found_date').notNull(),
    register_date: text('register_date').notNull(),
    description: text('description').notNull(),
});

export const item_subcategories = sqliteTable('item_subcategories', {
    item_id: int('item_id').notNull(),
    subcategory_id: int('subcategory_id').notNull(),
});