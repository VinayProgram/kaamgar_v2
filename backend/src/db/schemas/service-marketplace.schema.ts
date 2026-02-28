import { pgTable, uuid, text, varchar, timestamp, decimal, integer, smallint, boolean, primaryKey, index, customType, geometry, unique } from "drizzle-orm/pg-core";
import { serviceUsers } from "./service-users.schema";
import { users } from "./user.schema";
import { serviceCategories } from "./categories.schema";
import { skills } from "./skills.schema";

export { serviceCategories, ServiceCategory, NewServiceCategory } from "./categories.schema";
export { skills, Skill, NewSkill } from "./skills.schema";


// 1. Service Provider Profiles
export const serviceProviderProfiles = pgTable("service_provider_profiles", {
    id: uuid("id").defaultRandom().primaryKey(),
    serviceUserId: uuid("service_user_id")
        .notNull()
        .unique()
        .references(() => serviceUsers.id, { onDelete: 'cascade' }),
    bio: text("bio"),
    tagline: varchar("tagline", { length: 255 }),
    profilePictureUrl: text("profile_picture_url"),
    yearsOfExperience: integer("years_of_experience"),
    hourlyRate: decimal("hourly_rate", { precision: 12, scale: 2 }),

    // Professional Address
    addressLine1: text("address_line1").notNull(),
    addressLine2: text("address_line2"),
    city: varchar("city", { length: 100 }).notNull(),
    state: varchar("state", { length: 100 }).notNull(),
    postalCode: varchar("postal_code", { length: 20 }).notNull(),
    country: varchar("country", { length: 100 }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
    index("idx_sp_profile_user_id").on(table.serviceUserId),
]);

// 3. Category Mapping (Many-to-Many)
export const serviceProviderCategoryMap = pgTable("service_provider_category_map", {
    serviceUserId: uuid("service_user_id")
        .notNull()
        .references(() => serviceUsers.id, { onDelete: 'cascade' }),
    categoryId: uuid("category_id")
        .notNull()
        .references(() => serviceCategories.id, { onDelete: 'cascade' }),
}, (table) => [
    primaryKey({ columns: [table.serviceUserId, table.categoryId] }),
]);

// 4. Service Provider Skills
export const serviceProviderSkills = pgTable("service_provider_skills", {
    id: uuid("id").defaultRandom().primaryKey(),
    serviceUserId: uuid("service_user_id")
        .notNull()
        .references(() => serviceUsers.id, { onDelete: 'cascade' }),
    skillId: uuid("skill_id")
        .notNull()
        .references(() => skills.id, { onDelete: 'cascade' }),
    proficiencyLevel: varchar("proficiency_level", { length: 20 }), // e.g., Beginner, Intermediate, Expert
    createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
    index("idx_sp_skills_user_id").on(table.serviceUserId),
    unique("unique_sp_skill").on(table.serviceUserId, table.skillId),
]);


// 5. Service Provider Ratings
export const serviceProviderRatings = pgTable("service_provider_ratings", {
    id: uuid("id").defaultRandom().primaryKey(),
    serviceUserId: uuid("service_user_id")
        .notNull()
        .references(() => serviceUsers.id, { onDelete: 'cascade' }),
    reviewerUserId: uuid("reviewer_user_id")
        .notNull()
        .references(() => users.id), // Link to consumer
    rating: smallint("rating").notNull(),
    reviewText: text("review_text"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
    index("idx_sp_rating_user_id").on(table.serviceUserId),
]);

// 6. Service Provider Work History
export const serviceProviderWorkHistory = pgTable("service_provider_work_history", {
    id: uuid("id").defaultRandom().primaryKey(),
    serviceUserId: uuid("service_user_id")
        .notNull()
        .references(() => serviceUsers.id, { onDelete: 'cascade' }),
    companyName: varchar("company_name", { length: 255 }).notNull(),
    projectTitle: varchar("project_title", { length: 255 }),
    description: text("description"),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date"),
    isCurrentWork: boolean("is_current_work").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
    index("idx_sp_work_history_user_id").on(table.serviceUserId),
]);

// 7. Service Provider Current Location (PostGIS)
export const serviceProviderCurrentLocation = pgTable("service_provider_current_location", {
    id: uuid("id").defaultRandom().primaryKey(),
    serviceUserId: uuid("service_user_id")
        .notNull()
        .unique()
        .references(() => serviceUsers.id, { onDelete: 'cascade' }),
    location: geometry("location", { mode: "point" as any }).notNull(),
    accuracyMeters: decimal("accuracy_meters", { precision: 8, scale: 2 }),
    isOnline: boolean("is_online").default(true),
    lastUpdatedAt: timestamp("last_updated_at").defaultNow().notNull(),
}, (table) => [
    index("idx_sp_location").using("gist", table.location),
]);

export type ServiceProviderProfile = typeof serviceProviderProfiles.$inferSelect;
export type NewServiceProviderProfile = typeof serviceProviderProfiles.$inferInsert;

export type ServiceProviderCategoryMap = typeof serviceProviderCategoryMap.$inferSelect;
export type NewServiceProviderCategoryMap = typeof serviceProviderCategoryMap.$inferInsert;

export type ServiceProviderSkill = typeof serviceProviderSkills.$inferSelect;
export type NewServiceProviderSkill = typeof serviceProviderSkills.$inferInsert;

export type ServiceProviderRating = typeof serviceProviderRatings.$inferSelect;
export type NewServiceProviderRating = typeof serviceProviderRatings.$inferInsert;

export type ServiceProviderWorkHistory = typeof serviceProviderWorkHistory.$inferSelect;
export type NewServiceProviderWorkHistory = typeof serviceProviderWorkHistory.$inferInsert;

export type ServiceProviderCurrentLocation = typeof serviceProviderCurrentLocation.$inferSelect;
export type NewServiceProviderCurrentLocation = typeof serviceProviderCurrentLocation.$inferInsert;
