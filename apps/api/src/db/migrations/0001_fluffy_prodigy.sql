ALTER TABLE "users" RENAME COLUMN "chat_id" TO "last_name";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "username" text NOT NULL;