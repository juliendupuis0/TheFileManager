CREATE TABLE `directory` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`date_` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `collection` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `collection_name_unique` ON `collection` (`name`);--> statement-breakpoint
CREATE TABLE `file` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`extension` text NOT NULL,
	`date_` integer DEFAULT (unixepoch()) NOT NULL,
	`id_1` text,
	FOREIGN KEY (`id_1`) REFERENCES `directory`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `versions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date_` integer DEFAULT (unixepoch()) NOT NULL,
	`type` text NOT NULL,
	`id_1` text,
	`id_2` integer,
	FOREIGN KEY (`id_1`) REFERENCES `directory`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_2`) REFERENCES `file`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `file_collections` (
	`id` integer NOT NULL,
	`id_1` text NOT NULL,
	PRIMARY KEY(`id`, `id_1`),
	FOREIGN KEY (`id`) REFERENCES `file`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_1`) REFERENCES `collection`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `directory_collections` (
	`id` text NOT NULL,
	`id_1` text NOT NULL,
	PRIMARY KEY(`id`, `id_1`),
	FOREIGN KEY (`id`) REFERENCES `directory`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_1`) REFERENCES `collection`(`id`) ON UPDATE no action ON DELETE no action
);
