import { pgTable, uuid, text, varchar, timestamp, pgEnum, boolean } from "drizzle-orm/pg-core";

export const serviceUsers = pgTable("service_users", {
    id: uuid("id").defaultRandom().primaryKey(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    phoneNumber: varchar("phone_number", { length: 20 }).unique(),

    // Authentication
    password: text("password"), // Nullable for OAuth users
    oAuthProvider: varchar("o_auth_provider", { length: 50 }), // For generic OAuth 
    oAuthId: text("o_auth_id").unique(), // Generic OAuth ID
    // Status flags
    isEmailVerified: boolean("is_email_verified").default(false).notNull(),
    isPhoneVerified: boolean("is_phone_verified").default(false).notNull(),
    isActive: boolean("is_active").default(true).notNull(),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    lastLoginAt: timestamp("last_login_at"),
});

export type ServiceUser = typeof serviceUsers.$inferSelect;
export type NewServiceUser = typeof serviceUsers.$inferInsert;

