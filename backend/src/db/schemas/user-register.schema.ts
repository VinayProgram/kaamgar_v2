import { pgTable, uuid, text, varchar, timestamp, pgEnum, boolean } from "drizzle-orm/pg-core";

/**
 * Enum for user roles: consumer or service-provider
 */
export const consumerTypeEnum = pgEnum("consumer_type", ["consumer", "service-provider"]);

/**
 * Users table schema for registration and authentication
 */
export const register_users = pgTable("register_users", {
    id: uuid("id").defaultRandom().primaryKey(),

    // Name fields as requested
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    // Contact and Identity
    email: varchar("email", { length: 255 }).unique().notNull(),
    phoneNumber: varchar("phone_number", { length: 20 }).unique(),

    // Authentication
    password: text("password"), // Nullable for OAuth users
    oAuthProvider: varchar("o_auth_provider", { length: 50 }), // For generic OAuth 
    oAuthId: text("o_auth_id").unique(), // Generic OAuth ID

    // Consumer Type
    consumerType: consumerTypeEnum("consumer_type").default("consumer").notNull(),

    // Status flags
    isEmailVerified: boolean("is_email_verified").default(false).notNull(),
    isPhoneVerified: boolean("is_phone_verified").default(false).notNull(),
    isActive: boolean("is_active").default(true).notNull(),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    lastLoginAt: timestamp("last_login_at"),
});

export type RegisterUser = typeof register_users.$inferSelect;
export type NewRegisterUser = typeof register_users.$inferInsert;
