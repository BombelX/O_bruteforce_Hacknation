import path from "node:path";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "./client";

async function runMigrations() {
  const migrationsFolder = path.join(process.cwd(), "drizzle");
  console.log(`Running migrations from ${migrationsFolder}`);
  await migrate(db, { migrationsFolder });
  console.log("Migrations completed successfully");
}

runMigrations().catch((err) => {
  console.error("Migration failed", err);
  process.exit(1);
});
