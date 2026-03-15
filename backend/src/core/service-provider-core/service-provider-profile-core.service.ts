import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../../db/database-connection.module';
import { serviceProviderProfiles, ServiceProviderProfile, NewServiceProviderProfile } from '../../db/schemas/service-marketplace.schema';

@Injectable()
export class ServiceProviderProfileCoreService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: Database
    ) { }

    async findByUserId(serviceUserId: string): Promise<ServiceProviderProfile | undefined> {
        const [profile] = await this.db
            .select()
            .from(serviceProviderProfiles)
            .where(eq(serviceProviderProfiles.serviceUserId, serviceUserId));
        return profile;
    }

    async upsert(serviceUserId: string, data: Partial<NewServiceProviderProfile>): Promise<ServiceProviderProfile> {
        const existing = await this.findByUserId(serviceUserId);

        if (existing) {
            const [updated] = await this.db
                .update(serviceProviderProfiles)
                .set({ ...data, updatedAt: new Date() })
                .where(eq(serviceProviderProfiles.serviceUserId, serviceUserId))
                .returning();
            return updated;
        } else {
            const [inserted] = await this.db
                .insert(serviceProviderProfiles)
                .values({ ...data as NewServiceProviderProfile, serviceUserId })
                .returning();
            return inserted;
        }
    }
}
