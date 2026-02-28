import { Inject, Injectable } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../../db/database-connection.module';
import {
    serviceProviderCategoryMap, ServiceProviderCategoryMap, NewServiceProviderCategoryMap
} from '../../db/schemas/service-marketplace.schema';
import { serviceCategories, ServiceCategory, NewServiceCategory } from '../../db/schemas/categories.schema';


@Injectable()
export class CategoryCoreService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: Database
    ) { }

    // Categories Methods
    async createCategory(data: NewServiceCategory): Promise<ServiceCategory> {
        const [category] = await this.db.insert(serviceCategories).values(data).returning();
        return category;
    }

    async findAllCategories(): Promise<ServiceCategory[]> {
        return this.db.select().from(serviceCategories);
    }

    async findCategoryById(id: string): Promise<ServiceCategory | undefined> {
        const [category] = await this.db.select().from(serviceCategories).where(eq(serviceCategories.id, id));
        return category;
    }

    // Mapping Methods
    async addProviderToCategory(data: NewServiceProviderCategoryMap): Promise<ServiceProviderCategoryMap> {
        const [mapping] = await this.db.insert(serviceProviderCategoryMap).values(data).returning();
        return mapping;
    }

    async removeProviderFromCategory(serviceUserId: string, categoryId: string): Promise<boolean> {
        const result = await this.db
            .delete(serviceProviderCategoryMap)
            .where(
                and(
                    eq(serviceProviderCategoryMap.serviceUserId, serviceUserId),
                    eq(serviceProviderCategoryMap.categoryId, categoryId)
                )
            )
            .returning();
        return result.length > 0;
    }

    async getCategoriesByProvider(serviceUserId: string): Promise<ServiceCategory[]> {
        const results = await this.db
            .select({
                category: serviceCategories
            })
            .from(serviceProviderCategoryMap)
            .innerJoin(serviceCategories, eq(serviceProviderCategoryMap.categoryId, serviceCategories.id))
            .where(eq(serviceProviderCategoryMap.serviceUserId, serviceUserId));

        return results.map(r => r.category);
    }
}
