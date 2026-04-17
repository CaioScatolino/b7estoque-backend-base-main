CREATE TABLE `categories` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`deleted_at` timestamp,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`category_id` varchar(36) NOT NULL,
	`unit_price` decimal NOT NULL,
	`unit_type` enum('pç','kg','mt','L','ml','m','mm','cm','g','mg','un','bomba','ton','pct','par') NOT NULL DEFAULT 'un',
	`quantity` decimal NOT NULL DEFAULT '0',
	`minimum_quantity` decimal NOT NULL DEFAULT '0',
	`maximum_quantity` decimal NOT NULL DEFAULT '0',
	`deleted_at` timestamp,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`avatar` varchar(255),
	`role` enum('admin','user') NOT NULL DEFAULT 'user',
	`token` varchar(255),
	`deleted_at` timestamp,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `moves` (
	`id` varchar(36) NOT NULL,
	`product_id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`move_type` enum('IN','OUT') NOT NULL,
	`quantity` decimal NOT NULL,
	`unit_price` decimal NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `moves_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `moves` ADD CONSTRAINT `moves_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `moves` ADD CONSTRAINT `moves_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;