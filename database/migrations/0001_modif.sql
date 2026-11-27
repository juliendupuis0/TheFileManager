PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_file` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`extension` text NOT NULL,
	`date` integer,
	`parentId` integer,
	FOREIGN KEY (`parentId`) REFERENCES `directory`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_file`("id", "name", "extension", "date", "parentId") SELECT "id", "name", "extension", "date", "parentId" FROM `file`;--> statement-breakpoint
DROP TABLE `file`;--> statement-breakpoint
ALTER TABLE `__new_file` RENAME TO `file`;--> statement-breakpoint
PRAGMA foreign_keys=ON;