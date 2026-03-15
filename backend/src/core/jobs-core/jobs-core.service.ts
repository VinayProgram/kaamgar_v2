import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../../db/database-connection.module';
import { jobRequests, jobRequestSkills, jobRequestCategories } from '../../db/schemas/jobs.schema';
import { CreateJobDto } from '../../consumer/jobs-posting/dto/create-job.dto';

@Injectable()
export class JobsCoreService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: Database
    ) { }

    /**
     * Create a new job request with skills and categories in a transaction
     */
    async create(consumerUserId: string, data: CreateJobDto) {
        return await this.db.transaction(async (tx) => {
            // Ensure numbers for geometry, default to Pune coordinates if something is wrong
            // lon: 73.8567, lat: 18.5204
            const lon = typeof data.location.longitude === 'number' ? data.location.longitude : 73.8567;
            const lat = typeof data.location.latitude === 'number' ? data.location.latitude : 18.5204;

            // 1. Insert the main job request
            const [job] = await tx.insert(jobRequests).values({
                jobRequestType: data.jobRequestType,
                requiredAt: data.requiredAt,
                validOpenTill: data.validOpenTill,
                // location: sql`ST_SetSRID(ST_Point(${lon}, ${lat}), 4326)`,

                // Using sql to explicitly create the PostGIS point (longitude, latitude)
                location: sql`ST_SetSRID(ST_MakePoint(${lon}, ${lat}), 4326)`,
                jobDescription: data.jobDescription,
                priceType: data.priceType,
                budgetMin: data.budgetMin?.toString(),
                budgetMax: data.budgetMax?.toString(),
                currency: data.currency,
                consumerUserId: consumerUserId,
                status: 'open',
            }).returning();

            // 2. Link skills to the job request
            if (data.skillIds.length > 0) {
                await tx.insert(jobRequestSkills).values(
                    data.skillIds.map(skillId => ({
                        jobRequestId: job.id,
                        skillId: skillId,
                    }))
                );
            }

            // 3. Link categories to the job request
            if (data.categoryIds.length > 0) {
                await tx.insert(jobRequestCategories).values(
                    data.categoryIds.map(categoryId => ({
                        jobRequestId: job.id,
                        categoryId: categoryId,
                    }))
                );
            }

            return {
                ...job,
                skillIds: data.skillIds,
                categoryIds: data.categoryIds
            };
        });
    }

    /**
     * Find all jobs for a specific consumer
     */
    async findByConsumer(consumerUserId: string) {
        return this.db.select()
            .from(jobRequests)
            .where(eq(jobRequests.consumerUserId, consumerUserId));
    }
}
