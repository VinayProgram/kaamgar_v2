CREATE TYPE "public"."consumer_type" AS ENUM('consumer', 'service-provider');--> statement-breakpoint
CREATE TABLE "register_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(20),
	"password" text,
	"o_auth_provider" varchar(50),
	"o_auth_id" text,
	"consumer_type" "consumer_type" DEFAULT 'consumer' NOT NULL,
	"is_email_verified" boolean DEFAULT false NOT NULL,
	"is_phone_verified" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"last_login_at" timestamp,
	CONSTRAINT "register_users_email_unique" UNIQUE("email"),
	CONSTRAINT "register_users_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "register_users_o_auth_id_unique" UNIQUE("o_auth_id")
);
