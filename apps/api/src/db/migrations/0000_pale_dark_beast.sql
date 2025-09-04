CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"telegram_id" numeric NOT NULL,
	"chat_id" numeric NOT NULL,
	"first_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
