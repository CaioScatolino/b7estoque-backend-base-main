ALTER TABLE `categories` MODIFY COLUMN `deleted_at` datetime;--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `deleted_at` datetime;