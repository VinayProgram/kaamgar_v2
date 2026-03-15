import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../../db/database-connection.module';
import { serviceProviderCurrentLocation, ServiceProviderCurrentLocation, NewServiceProviderCurrentLocation } from '../../db/schemas/service-marketplace.schema';

@Injectable()
export class ServiceProviderLocationCoreService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: Database
    ) { }

    async findByUserId(serviceUserId: string): Promise<ServiceProviderCurrentLocation | undefined> {
        const [location] = await this.db
            .select()
            .from(serviceProviderCurrentLocation)
            .where(eq(serviceProviderCurrentLocation.serviceUserId, serviceUserId));
        return location;
    }

    async upsert(serviceUserId: string, data: Partial<NewServiceProviderCurrentLocation>): Promise<ServiceProviderCurrentLocation> {
        const existing = await this.findByUserId(serviceUserId);

        if (existing) {
            const [updated] = await this.db
                .update(serviceProviderCurrentLocation)
                .set({ ...data, lastUpdatedAt: new Date() })
                .where(eq(serviceProviderCurrentLocation.serviceUserId, serviceUserId))
                .returning();
            return updated;
        } else {
            const [inserted] = await this.db
                .insert(serviceProviderCurrentLocation)
                .values({ ...data as NewServiceProviderCurrentLocation, serviceUserId })
                .returning();
            return inserted;
        }
    }
}
