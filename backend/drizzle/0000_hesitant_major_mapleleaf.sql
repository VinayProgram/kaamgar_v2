CREATE TYPE "public"."applicant_status" AS ENUM('applied', 'shortlisted', 'accepted', 'rejected', 'withdrawn');--> statement-breakpoint
CREATE TYPE "public"."job_request_type" AS ENUM('instant', 'scheduled', 'recurring');--> statement-breakpoint
CREATE TYPE "public"."job_status" AS ENUM('draft', 'open', 'expired', 'assigned', 'in_progress', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."price_type" AS ENUM('fixed', 'negotiable', 'range');--> statement-breakpoint
CREATE TABLE "job_applicants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_request_id" uuid NOT NULL,
	"service_provider_user_id" uuid NOT NULL,
	"proposed_price" numeric(12, 2),
	"cover_message" text,
	"status" "applicant_status" DEFAULT 'applied' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "unique_job_applicant" UNIQUE("job_request_id","service_provider_user_id")
);
--> statement-breakpoint
CREATE TABLE "job_request_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_request_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	CONSTRAINT "unique_job_category" UNIQUE("job_request_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "job_request_skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_request_id" uuid NOT NULL,
	"skill_id" uuid NOT NULL,
	CONSTRAINT "unique_job_skill" UNIQUE("job_request_id","skill_id")
);
--> statement-breakpoint
CREATE TABLE "job_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_request_type" "job_request_type" NOT NULL,
	"required_at" timestamp,
	"valid_open_till" timestamp NOT NULL,
	"location" geometry(point) NOT NULL,
	"job_description" text NOT NULL,
	"price_type" "price_type" NOT NULL,
	"budget_min" numeric(12, 2),
	"budget_max" numeric(12, 2),
	"currency" varchar(10) DEFAULT 'INR',
	"consumer_user_id" uuid NOT NULL,
	"status" "job_status" DEFAULT 'open' NOT NULL,
	"assigned_service_provider_id" uuid,
	"total_applicants" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "check_valid_open_till" CHECK ("job_requests"."valid_open_till" > "job_requests"."created_at"),
	CONSTRAINT "check_required_at" CHECK ("job_requests"."required_at" >= "job_requests"."created_at"),
	CONSTRAINT "check_budget_range" CHECK ("job_requests"."budget_min" <= "job_requests"."budget_max")
);
--> statement-breakpoint
CREATE TABLE "service_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"description" text,
	"parent_category_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "service_categories_name_unique" UNIQUE("name"),
	CONSTRAINT "service_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "service_provider_category_map" (
	"service_user_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	CONSTRAINT "service_provider_category_map_service_user_id_category_id_pk" PRIMARY KEY("service_user_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "service_provider_current_location" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_user_id" uuid NOT NULL,
	"location" geometry(point) NOT NULL,
	"accuracy_meters" numeric(8, 2),
	"is_online" boolean DEFAULT true,
	"last_updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "service_provider_current_location_service_user_id_unique" UNIQUE("service_user_id")
);
--> statement-breakpoint
CREATE TABLE "service_provider_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_user_id" uuid NOT NULL,
	"bio" text,
	"tagline" varchar(255),
	"profile_picture_url" text,
	"years_of_experience" integer,
	"hourly_rate" numeric(12, 2),
	"address_line1" text NOT NULL,
	"address_line2" text,
	"city" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	"postal_code" varchar(20) NOT NULL,
	"country" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "service_provider_profiles_service_user_id_unique" UNIQUE("service_user_id")
);
--> statement-breakpoint
CREATE TABLE "service_provider_ratings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_user_id" uuid NOT NULL,
	"reviewer_user_id" uuid NOT NULL,
	"rating" smallint NOT NULL,
	"review_text" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_provider_skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_user_id" uuid NOT NULL,
	"skill_id" uuid NOT NULL,
	"proficiency_level" varchar(20),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "unique_sp_skill" UNIQUE("service_user_id","skill_id")
);
--> statement-breakpoint
CREATE TABLE "service_provider_work_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_user_id" uuid NOT NULL,
	"company_name" varchar(255) NOT NULL,
	"project_title" varchar(255),
	"description" text,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	"is_current_work" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "skills_name_unique" UNIQUE("name"),
	CONSTRAINT "skills_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "service_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(20),
	"password" text,
	"o_auth_provider" varchar(50),
	"o_auth_id" text,
	"is_email_verified" boolean DEFAULT false NOT NULL,
	"is_phone_verified" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"last_login_at" timestamp,
	CONSTRAINT "service_users_email_unique" UNIQUE("email"),
	CONSTRAINT "service_users_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "service_users_o_auth_id_unique" UNIQUE("o_auth_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(20),
	"password" text,
	"o_auth_provider" varchar(50),
	"o_auth_id" text,
	"is_email_verified" boolean DEFAULT false NOT NULL,
	"is_phone_verified" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"last_login_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "users_o_auth_id_unique" UNIQUE("o_auth_id")
);
--> statement-breakpoint
ALTER TABLE "job_applicants" ADD CONSTRAINT "job_applicants_job_request_id_job_requests_id_fk" FOREIGN KEY ("job_request_id") REFERENCES "public"."job_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_applicants" ADD CONSTRAINT "job_applicants_service_provider_user_id_service_users_id_fk" FOREIGN KEY ("service_provider_user_id") REFERENCES "public"."service_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_request_categories" ADD CONSTRAINT "job_request_categories_job_request_id_job_requests_id_fk" FOREIGN KEY ("job_request_id") REFERENCES "public"."job_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_request_categories" ADD CONSTRAINT "job_request_categories_category_id_service_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."service_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_request_skills" ADD CONSTRAINT "job_request_skills_job_request_id_job_requests_id_fk" FOREIGN KEY ("job_request_id") REFERENCES "public"."job_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_request_skills" ADD CONSTRAINT "job_request_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_requests" ADD CONSTRAINT "job_requests_consumer_user_id_users_id_fk" FOREIGN KEY ("consumer_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_requests" ADD CONSTRAINT "job_requests_assigned_service_provider_id_service_users_id_fk" FOREIGN KEY ("assigned_service_provider_id") REFERENCES "public"."service_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_categories" ADD CONSTRAINT "service_categories_parent_category_id_service_categories_id_fk" FOREIGN KEY ("parent_category_id") REFERENCES "public"."service_categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_provider_category_map" ADD CONSTRAINT "service_provider_category_map_service_user_id_service_users_id_fk" FOREIGN KEY ("service_user_id") REFERENCES "public"."service_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_provider_category_map" ADD CONSTRAINT "service_provider_category_map_category_id_service_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."service_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_provider_current_location" ADD CONSTRAINT "service_provider_current_location_service_user_id_service_users_id_fk" FOREIGN KEY ("service_user_id") REFERENCES "public"."service_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_provider_profiles" ADD CONSTRAINT "service_provider_profiles_service_user_id_service_users_id_fk" FOREIGN KEY ("service_user_id") REFERENCES "public"."service_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_provider_ratings" ADD CONSTRAINT "service_provider_ratings_service_user_id_service_users_id_fk" FOREIGN KEY ("service_user_id") REFERENCES "public"."service_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_provider_ratings" ADD CONSTRAINT "service_provider_ratings_reviewer_user_id_users_id_fk" FOREIGN KEY ("reviewer_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_provider_skills" ADD CONSTRAINT "service_provider_skills_service_user_id_service_users_id_fk" FOREIGN KEY ("service_user_id") REFERENCES "public"."service_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_provider_skills" ADD CONSTRAINT "service_provider_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_provider_work_history" ADD CONSTRAINT "service_provider_work_history_service_user_id_service_users_id_fk" FOREIGN KEY ("service_user_id") REFERENCES "public"."service_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_applicant_sp_id" ON "job_applicants" USING btree ("service_provider_user_id");--> statement-breakpoint
CREATE INDEX "idx_applicant_status" ON "job_applicants" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_job_status" ON "job_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_job_consumer_user_id" ON "job_requests" USING btree ("consumer_user_id");--> statement-breakpoint
CREATE INDEX "idx_job_status_valid_till" ON "job_requests" USING btree ("status","valid_open_till");--> statement-breakpoint
CREATE INDEX "idx_job_location" ON "job_requests" USING gist ("location");--> statement-breakpoint
CREATE INDEX "idx_sp_location" ON "service_provider_current_location" USING gist ("location");--> statement-breakpoint
CREATE INDEX "idx_sp_profile_user_id" ON "service_provider_profiles" USING btree ("service_user_id");--> statement-breakpoint
CREATE INDEX "idx_sp_rating_user_id" ON "service_provider_ratings" USING btree ("service_user_id");--> statement-breakpoint
CREATE INDEX "idx_sp_skills_user_id" ON "service_provider_skills" USING btree ("service_user_id");--> statement-breakpoint
CREATE INDEX "idx_sp_work_history_user_id" ON "service_provider_work_history" USING btree ("service_user_id");