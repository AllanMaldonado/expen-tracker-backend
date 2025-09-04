import { numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid().primaryKey().defaultRandom(),
	telegram_id: numeric().notNull(),
	first_name: text().notNull(), 
	last_name: text(),
	username: text(), 
	createdAt: timestamp().defaultNow().notNull(),
});