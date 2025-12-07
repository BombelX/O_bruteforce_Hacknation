CREATE TABLE IF NOT EXISTS `refresh_tokens` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`token` text NOT NULL,
	`expires_at` text NOT NULL,
	`is_revoked` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `test` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL
);
