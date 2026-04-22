ALTER TABLE `users` MODIFY COLUMN `deleted_at` datetime;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);