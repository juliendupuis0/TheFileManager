CREATE TABLE `directory` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`parentId` integer,
	`date` integer NOT NULL,
	FOREIGN KEY (`parentId`) REFERENCES `directory`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `collection` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `collection_name_unique` ON `collection` (`name`);--> statement-breakpoint
CREATE TABLE `file` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`extension` text NOT NULL,
	`date` integer NOT NULL,
	`parentId` integer,
	FOREIGN KEY (`parentId`) REFERENCES `directory`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `versions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` integer NOT NULL,
	`type` text NOT NULL,
	`directoryId` integer,
	`fileId` integer,
	FOREIGN KEY (`directoryId`) REFERENCES `directory`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`fileId`) REFERENCES `file`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `file_collections` (
	`fileId` integer NOT NULL,
	`collectionId` integer NOT NULL,
	PRIMARY KEY(`fileId`, `collectionId`),
	FOREIGN KEY (`fileId`) REFERENCES `file`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`collectionId`) REFERENCES `collection`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `directory_collections` (
	`directoryId` integer NOT NULL,
	`collectionId` integer NOT NULL,
	PRIMARY KEY(`directoryId`, `collectionId`),
	FOREIGN KEY (`directoryId`) REFERENCES `directory`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`collectionId`) REFERENCES `collection`(`id`) ON UPDATE no action ON DELETE no action
);
