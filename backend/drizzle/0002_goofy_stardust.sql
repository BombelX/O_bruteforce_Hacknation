CREATE TABLE IF NOT EXISTS `categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `item_subcategories` (
	`item_id` integer NOT NULL,
	`subcategory_id` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `items` (
	`id` integer PRIMARY KEY NOT NULL,
	`category_id` integer NOT NULL,
	`where_found` text NOT NULL,
	`found_date` text NOT NULL,
	`register_date` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `subcategories` (
	`id` integer PRIMARY KEY NOT NULL,
	`category_id` integer NOT NULL,
	`name` text NOT NULL
);
