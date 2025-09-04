import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users.ts";

export const categories = pgTable("categories", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    user_id: uuid()
        .references(() => users.id)
        .notNull(),
    createdAt: timestamp().defaultNow().notNull()
})