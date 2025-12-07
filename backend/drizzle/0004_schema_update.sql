CREATE TABLE `old_items` (
	`id` integer PRIMARY KEY NOT NULL,
	`category` text,
	`found_date` text,
	`where_found` text,
	`register_date` text,
	`description` text,
	`voivodeship` text,
	`region` text,
	`subcategories` text
);
--> statement-breakpoint
CREATE TABLE `region` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer,
	`voivodeship ` text,
	`region` text
);
--> statement-breakpoint
DROP TABLE `item_subcategories`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
INSERT INTO `__new_categories`("id", "name") SELECT "id", "name" FROM `categories`;--> statement-breakpoint
DROP TABLE `categories`;--> statement-breakpoint
ALTER TABLE `__new_categories` RENAME TO `categories`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_items` (
	`id` integer PRIMARY KEY NOT NULL,
	`category_id` integer,
	`subcategory_id` integer,
	`where_found` text,
	`found_date` text,
	`register_date` text,
	`description` text,
	`user_id` integer
);
--> statement-breakpoint
INSERT INTO `__new_items`("id", "category_id", "subcategory_id", "where_found", "found_date", "register_date", "description", "user_id") SELECT "id", "category_id", "subcategory_id", "where_found", "found_date", "register_date", "description", NULL FROM `items`;--> statement-breakpoint
DROP TABLE `items`;--> statement-breakpoint
ALTER TABLE `__new_items` RENAME TO `items`;--> statement-breakpoint
CREATE TABLE `__new_subcategories` (
	`id` integer PRIMARY KEY NOT NULL,
	`category_id` integer,
	`name` text
);
--> statement-breakpoint
INSERT INTO `__new_subcategories`("id", "category_id", "name") SELECT "id", "category_id", "name" FROM `subcategories`;--> statement-breakpoint
DROP TABLE `subcategories`;--> statement-breakpoint
ALTER TABLE `__new_subcategories` RENAME TO `subcategories`;