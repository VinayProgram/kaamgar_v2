import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../../db/database-connection.module';
import { serviceProviderCurrentLocation, ServiceProviderCurrentLocation, NewServiceProviderCurrentLocation } from '../../db/schemas/service-marketplace.schema';

@Injectable()
export class LocationCoreService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: Database
    ) { }

    async updateLocation(data: NewServiceProviderCurrentLocation): Promise<ServiceProviderCurrentLocation> {
        const [location] = await this.db
            .insert(serviceProviderCurrentLocation)
            .values(data)
            .onConflictDoUpdate({
                target: [serviceProviderCurrentLocation.serviceUserId],
                set: {
                    location: data.location,
                    accuracyMeters: data.accuracyMeters,
                    isOnline: data.isOnline,
                    lastUpdatedAt: new Date()
                }
            })
            .returning();
        return location;
    }

    async findByUserId(serviceUserId: string): Promise<ServiceProviderCurrentLocation | undefined> {
        const [location] = await this.db
            .select()
            .from(serviceProviderCurrentLocation)
            .where(eq(serviceProviderCurrentLocation.serviceUserId, serviceUserId));
        return location;
    }

    async delete(serviceUserId: string): Promise<boolean> {
        const result = await this.db
            .delete(serviceProviderCurrentLocation)
            .where(eq(serviceProviderCurrentLocation.serviceUserId, serviceUserId))
            .returning();
        return result.length > 0;
    }
}
