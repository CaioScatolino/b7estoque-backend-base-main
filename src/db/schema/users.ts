import { datetime, mysqlEnum, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const userRoleEnum = mysqlEnum('role', ['admin', 'user']).notNull().default('user');

export const users = mysqlTable('users', {
    id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    avatar: varchar('avatar', { length: 255 }),
    role: userRoleEnum,
    token: varchar('token', { length: 255 }),
    deletedAt: datetime('deleted_at'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
})

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;