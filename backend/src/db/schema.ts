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
    name: text('name'),
});

export const subcategories = sqliteTable('subcategories', {
    id: int('id').primaryKey(),
    category_id: int('category_id'),
    name: text('name'),
});

export const items = sqliteTable('items', {
    id: int('id').primaryKey(),
    category_id: int('category_id'),
    subcategory_id: int('subcategory_id'),
    where_found: text('where_found'),
    found_date: text('found_date'),
    register_date: text('register_date'),
    description: text('description'),
    user_id: int('user_id'),
});

export const old_items = sqliteTable('old_items', {
    id: int('id').primaryKey(),
    category: text('category'),
    found_date: text('found_date'),
    where_found: text('where_found'),
    register_date: text('register_date'),
    description: text('description'),
    voivodeship: text('voivodeship'),
    region: text('region'),
    subcategories: text('subcategories'),
});

export const region = sqliteTable('region', {
    id: int('id').primaryKey(),
    user_id: int('user_id'),
    voivodeship : text('voivodeship '),
    region: text('region')
});