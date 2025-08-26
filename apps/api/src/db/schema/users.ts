import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid().primaryKey().defaultRandom(),
	telegram_id: uuid().notNull(),
	chat_id: uuid().notNull(),
	first_name: text().notNull(),
	createdAt: timestamp().defaultNow().notNull(),
});