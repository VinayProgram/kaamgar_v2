import { pgTable, uuid, text, varchar, timestamp } from "drizzle-orm/pg-core";

// Service Categories
export const serviceCategories = pgTable("service_categories", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 100 }).unique().notNull(),
    slug: varchar("slug", { length: 100 }).unique().notNull(),
    description: text("description"),
    parentCategoryId: uuid("parent_category_id").references((): any => serviceCategories.id, { onDelete: 'set null' }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ServiceCategory = typeof serviceCategories.$inferSelect;
export type NewServiceCategory = typeof serviceCategories.$inferInsert;
