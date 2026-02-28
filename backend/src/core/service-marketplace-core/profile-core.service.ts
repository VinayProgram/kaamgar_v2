import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../../db/database-connection.module';
import { serviceProviderProfiles, ServiceProviderProfile, NewServiceProviderProfile } from '../../db/schemas/service-marketplace.schema';

@Injectable()
export class ProfileCoreService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: Database
    ) { }

    async create(data: NewServiceProviderProfile): Promise<ServiceProviderProfile> {
        const [profile] = await this.db.insert(serviceProviderProfiles).values(data).returning();
        return profile;
    }

    async findByUserId(serviceUserId: string): Promise<ServiceProviderProfile | undefined> {
        const [profile] = await this.db
            .select()
            .from(serviceProviderProfiles)
            .where(eq(serviceProviderProfiles.serviceUserId, serviceUserId));
        return profile;
    }

    async update(serviceUserId: string, data: Partial<NewServiceProviderProfile>): Promise<ServiceProviderProfile | undefined> {
        const [updated] = await this.db
            .update(serviceProviderProfiles)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(serviceProviderProfiles.serviceUserId, serviceUserId))
            .returning();
        return updated;
    }

    async delete(serviceUserId: string): Promise<boolean> {
        const result = await this.db
            .delete(serviceProviderProfiles)
            .where(eq(serviceProviderProfiles.serviceUserId, serviceUserId))
            .returning();
        return result.length > 0;
    }
}
