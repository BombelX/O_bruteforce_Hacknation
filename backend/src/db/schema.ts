import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { email, string } from "zod";
import { Logger, LoggerConfig } from "log4ts";


export const users = sqliteTable('test',
    {
        id: int('id').primaryKey(),
        testvalue: text().notNull(),
    }
)