CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "telegram_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "chat_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "first_name" text NOT NULL;