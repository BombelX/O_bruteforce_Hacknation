CREATE TABLE IF NOT EXISTS `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
DROP TABLE IF EXISTS `test`;