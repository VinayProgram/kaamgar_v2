import { pgTable, uuid, text, varchar, timestamp, decimal, integer, pgEnum, geometry, index, unique, check, smallint, boolean } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { serviceUsers } from "./service-users.schema";
import { serviceCategories, skills } from "./service-marketplace.schema";

import { sql } from "drizzle-orm";

// --- ENUMS ---

export const jobRequestTypeEnum = pgEnum("job_request_type", ["instant", "scheduled", "recurring"]);

export const priceTypeEnum = pgEnum("price_type", ["fixed", "negotiable", "range"]);

export const jobStatusEnum = pgEnum("job_status", [
    "draft",
    "open",
    "expired",
    "assigned",
    "in_progress",
    "completed",
    "cancelled"
]);

export const applicantStatusEnum = pgEnum("applicant_status", [
    "applied",
    "shortlisted",
    "accepted",
    "rejected",
    "withdrawn"
]);


// --- JOB REQUESTS ---
export const jobRequests = pgTable("job_requests", {
    id: uuid("id").defaultRandom().primaryKey(),
    jobRequestType: jobRequestTypeEnum("job_request_type").notNull(),
    requiredAt: timestamp("required_at"),
    validOpenTill: timestamp("valid_open_till").notNull(),

    location: geometry("location", { mode: "point" as any }).notNull(),

    jobDescription: text("job_description").notNull(),
    priceType: priceTypeEnum("price_type").notNull(),
    budgetMin: decimal("budget_min", { precision: 12, scale: 2 }),
    budgetMax: decimal("budget_max", { precision: 12, scale: 2 }),
    currency: varchar("currency", { length: 10 }).default("INR"),

    consumerUserId: uuid("consumer_user_id")
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),

    status: jobStatusEnum("status").default("open").notNull(),

    assignedServiceProviderId: uuid("assigned_service_provider_id")
        .references(() => serviceUsers.id, { onDelete: 'set null' }),

    totalApplicants: integer("total_applicants").default(0).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"), // Soft delete
}, (table) => [
    index("idx_job_status").on(table.status),
    index("idx_job_consumer_user_id").on(table.consumerUserId),
    index("idx_job_status_valid_till").on(table.status, table.validOpenTill),
    index("idx_job_location").using("gist", table.location),
    // CHECK constraints
    check("check_valid_open_till", sql`${table.validOpenTill} > ${table.createdAt}`),
    check("check_required_at", sql`${table.requiredAt} >= ${table.createdAt}`),
    check("check_budget_range", sql`${table.budgetMin} <= ${table.budgetMax}`),
]);

// --- JOB REQUEST SKILLS (Many-to-Many) ---
export const jobRequestSkills = pgTable("job_request_skills", {
    id: uuid("id").defaultRandom().primaryKey(),
    jobRequestId: uuid("job_request_id")
        .notNull()
        .references(() => jobRequests.id, { onDelete: 'cascade' }),
    skillId: uuid("skill_id")
        .notNull()
        .references(() => skills.id, { onDelete: 'cascade' }),
}, (table) => [
    unique("unique_job_skill").on(table.jobRequestId, table.skillId),
]);

// --- JOB REQUEST CATEGORIES (Many-to-Many) ---
export const jobRequestCategories = pgTable("job_request_categories", {
    id: uuid("id").defaultRandom().primaryKey(),
    jobRequestId: uuid("job_request_id")
        .notNull()
        .references(() => jobRequests.id, { onDelete: 'cascade' }),
    categoryId: uuid("category_id")
        .notNull()
        .references(() => serviceCategories.id, { onDelete: 'cascade' }),
}, (table) => [
    unique("unique_job_category").on(table.jobRequestId, table.categoryId),
]);

// --- JOB APPLICANTS ---
export const jobApplicants = pgTable("job_applicants", {
    id: uuid("id").defaultRandom().primaryKey(),
    jobRequestId: uuid("job_request_id")
        .notNull()
        .references(() => jobRequests.id, { onDelete: 'cascade' }),
    serviceProviderUserId: uuid("service_provider_user_id")
        .notNull()
        .references(() => serviceUsers.id, { onDelete: 'cascade' }),

    proposedPrice: decimal("proposed_price", { precision: 12, scale: 2 }),
    coverMessage: text("cover_message"),

    status: applicantStatusEnum("status").default("applied").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
    unique("unique_job_applicant").on(table.jobRequestId, table.serviceProviderUserId),
    index("idx_applicant_sp_id").on(table.serviceProviderUserId),
    index("idx_applicant_status").on(table.status),
]);

// --- TYPE EXPORTS ---


export type JobRequest = typeof jobRequests.$inferSelect;
export type NewJobRequest = typeof jobRequests.$inferInsert;

export type JobRequestSkill = typeof jobRequestSkills.$inferSelect;
export type NewJobRequestSkill = typeof jobRequestSkills.$inferInsert;

export type JobRequestCategory = typeof jobRequestCategories.$inferSelect;
export type NewJobRequestCategory = typeof jobRequestCategories.$inferInsert;

export type JobApplicant = typeof jobApplicants.$inferSelect;
export type NewJobApplicant = typeof jobApplicants.$inferInsert;
