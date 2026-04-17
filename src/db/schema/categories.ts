import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const categories = mysqlTable('categories', {
    id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: varchar('name', { length: 255 }).notNull(),
    deletedAt: timestamp('deleted_at'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});


export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;