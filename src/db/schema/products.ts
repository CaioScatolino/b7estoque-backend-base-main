import { decimal, mysqlEnum, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { categories } from "./categories";

export const unitTypeEnum = mysqlEnum('unit_type', ['pç', 'kg', 'mt', 'L', 'ml', 'm', 'mm', 'cm', 'g', 'mg', 'un', 'bomba', 'ton', 'pct', 'par']);

export const products = mysqlTable('products', {
    id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: varchar('name', { length: 255 }).notNull(),
    categoryId: varchar('category_id', { length: 36 }).notNull().references(() => categories.id),
    unitPrice: decimal('unit_price').notNull(),
    unitType: unitTypeEnum.notNull().default('un'),
    quantity: decimal('quantity').notNull().default('0'),
    minimumQuantity: decimal('minimum_quantity').notNull().default('0'),
    maximumQuantity: decimal('maximum_quantity').notNull().default('0'),
    deletedAt: timestamp('deleted_at'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;