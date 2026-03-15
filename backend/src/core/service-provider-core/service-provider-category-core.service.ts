import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../../db/database-connection.module';
import { serviceProviderCategoryMap, ServiceProviderCategoryMap, NewServiceProviderCategoryMap } from '../../db/schemas/service-marketplace.schema';

@Injectable()
export class ServiceProviderCategoryCoreService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: Database
    ) { }

    async getCategoriesByProvider(serviceUserId: string): Promise<ServiceProviderCategoryMap[]> {
        return this.db
            .select()
            .from(serviceProviderCategoryMap)
            .where(eq(serviceProviderCategoryMap.serviceUserId, serviceUserId));
    }

    async updateProviderCategories(serviceUserId: string, categoryIds: string[]): Promise<void> {
        await this.db.transaction(async (tx) => {
            // Delete existing
            await tx.delete(serviceProviderCategoryMap).where(eq(serviceProviderCategoryMap.serviceUserId, serviceUserId));
            
            // Insert new
            if (categoryIds.length > 0) {
                const values = categoryIds.map(categoryId => ({
                    serviceUserId,
                    categoryId,
                }));
                await tx.insert(serviceProviderCategoryMap).values(values);
            }
        });
    }
}
