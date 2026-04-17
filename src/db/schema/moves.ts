import {
  decimal,
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { products } from "./products";
import { users } from "./users";

export const movesTypeEnum = mysqlEnum("move_type", ["IN", "OUT"]).notNull();

export const moves = mysqlTable("moves", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  productId: varchar("product_id", { length: 36 })
    .notNull()
    .references(() => products.id),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id),
  type: movesTypeEnum,
  quantity: decimal("quantity").notNull(),
  unitPrice: decimal("unit_price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Move = typeof moves.$inferSelect;
export type NewMove = typeof moves.$inferInsert;
