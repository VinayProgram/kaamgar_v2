import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../../db/database-connection.module';
import { serviceProviderRatings, ServiceProviderRating, NewServiceProviderRating } from '../../db/schemas/service-marketplace.schema';

@Injectable()
export class RatingCoreService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: Database
    ) { }

    async addRating(data: NewServiceProviderRating): Promise<ServiceProviderRating> {
        const [rating] = await this.db.insert(serviceProviderRatings).values(data).returning();
        return rating;
    }

    async getRatingsByProvider(serviceUserId: string): Promise<ServiceProviderRating[]> {
        return this.db
            .select()
            .from(serviceProviderRatings)
            .where(eq(serviceProviderRatings.serviceUserId, serviceUserId));
    }

    async deleteRating(id: string): Promise<boolean> {
        const result = await this.db
            .delete(serviceProviderRatings)
            .where(eq(serviceProviderRatings.id, id))
            .returning();
        return result.length > 0;
    }
}
