import { Inject, Injectable } from '@nestjs/common';
import { eq, sql, asc, inArray } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../../db/database-connection.module';
import { jobRequests, jobRequestSkills, jobRequestCategories } from '../../db/schemas/jobs.schema';
import { CreateJobDto } from '../../consumer/jobs-posting/dto/create-job.dto';
import { skills } from 'src/db/schemas/skills.schema';
import { serviceCategories } from 'src/db/schemas/categories.schema';

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

    /**
     * Find jobs for a service provider based on skills, categories, and location proximity
     */
    async findNearbyJobs(params: {
        skillIds: string[];
        categoryIds: string[];
        latitude: number;
        longitude: number;
        radiusMeters?: number;
    }) {
        const { skillIds, categoryIds, latitude, longitude, radiusMeters = 50000 } = params;

        // Construct conditions
        const conditions = [
            eq(jobRequests.status, 'open'),
        ];

        // Filter by skills if provided
        if (skillIds.length > 0) {
            conditions.push(inArray(jobRequests.id,
                this.db.select({ id: jobRequestSkills.jobRequestId })
                    .from(jobRequestSkills)
                    .where(inArray(jobRequestSkills.skillId, skillIds))
            ));
        }

        // Filter by categories if provided
        if (categoryIds.length > 0) {
            conditions.push(inArray(jobRequests.id,
                this.db.select({ id: jobRequestCategories.jobRequestId })
                    .from(jobRequestCategories)
                    .where(inArray(jobRequestCategories.categoryId, categoryIds))
            ));
        }

        // Distance filtering and calculation
        const distanceSql = sql<number>`ST_Distance(
            ${jobRequests.location}, 
            ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography
        )`;

        // conditions.push(sql`ST_DWithin(
        //     ${jobRequests.location}, 
        //     ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography, 
        //     ${radiusMeters}
        // )`);

        return this.db.select({
            id: jobRequests.id,
            jobRequestType: jobRequests.jobRequestType,
            jobDescription: jobRequests.jobDescription,
            status: jobRequests.status,
            budgetMin: jobRequests.budgetMin,
            budgetMax: jobRequests.budgetMax,
            currency: jobRequests.currency,
            requiredAt: jobRequests.requiredAt,
            validOpenTill: jobRequests.validOpenTill,
            distance: distanceSql.as('distance'),
            createdAt: jobRequests.createdAt,
        })
            .from(jobRequests)
            .where(sql`${sql.join(conditions, sql` AND `)}`)
            .orderBy(asc(sql`distance`));
    }
    /**
     * Update an existing job request
     */
    async update(jobId: string, consumerUserId: string, data: Partial<CreateJobDto>) {
        return await this.db.transaction(async (tx) => {
            // 1. Verify ownership and existence
            const [existingJob] = await tx.select()
                .from(jobRequests)
                .where(eq(jobRequests.id, jobId))
                .limit(1);

            if (!existingJob) {
                throw new Error('Job not found');
            }

            if (existingJob.consumerUserId !== consumerUserId) {
                throw new Error('You do not have permission to update this job');
            }

            // 2. Prepare update values
            const updateValues: any = {
                updatedAt: new Date(),
            };

            if (data.jobRequestType) updateValues.jobRequestType = data.jobRequestType;
            if (data.jobDescription) updateValues.jobDescription = data.jobDescription;
            if (data.priceType) updateValues.priceType = data.priceType;
            if (data.budgetMin !== undefined) updateValues.budgetMin = data.budgetMin.toString();
            if (data.budgetMax !== undefined) updateValues.budgetMax = data.budgetMax.toString();
            if (data.currency) updateValues.currency = data.currency;
            if (data.requiredAt) updateValues.requiredAt = data.requiredAt;
            if (data.validOpenTill) updateValues.validOpenTill = data.validOpenTill;

            if (data.location) {
                const lon = data.location.longitude;
                const lat = data.location.latitude;
                updateValues.location = sql`ST_SetSRID(ST_MakePoint(${lon}, ${lat}), 4326)`;
            }

            // 3. Update job request
            const [updatedJob] = await tx.update(jobRequests)
                .set(updateValues)
                .where(eq(jobRequests.id, jobId))
                .returning();

            // 4. Update skills if provided
            if (data.skillIds) {
                await tx.delete(jobRequestSkills).where(eq(jobRequestSkills.jobRequestId, jobId));
                if (data.skillIds.length > 0) {
                    await tx.insert(jobRequestSkills).values(
                        data.skillIds.map(skillId => ({
                            jobRequestId: jobId,
                            skillId: skillId,
                        }))
                    );
                }
            }

            // 5. Update categories if provided
            if (data.categoryIds) {
                await tx.delete(jobRequestCategories).where(eq(jobRequestCategories.jobRequestId, jobId));
                if (data.categoryIds.length > 0) {
                    await tx.insert(jobRequestCategories).values(
                        data.categoryIds.map(categoryId => ({
                            jobRequestId: jobId,
                            categoryId: categoryId,
                        }))
                    );
                }
            }

            return updatedJob;
        });
    }

    /**
     * Close a job request
     */
    async close(jobId: string, consumerUserId: string) {
        const [job] = await this.db.select()
            .from(jobRequests)
            .where(eq(jobRequests.id, jobId))
            .limit(1);

        if (!job) {
            throw new Error('Job not found');
        }

        if (job.consumerUserId !== consumerUserId) {
            throw new Error('You do not have permission to close this job');
        }

        const [closedJob] = await this.db.update(jobRequests)
            .set({
                status: 'cancelled',
                updatedAt: new Date()
            })
            .where(eq(jobRequests.id, jobId))
            .returning();

        return closedJob;
    }

    /**
     * Find a single job with all details (skills, categories)
     */
    async findByIdWithDetails(jobId: string) {
        const results = await this.db.select()
            .from(jobRequests)
            .leftJoin(jobRequestSkills, eq(jobRequests.id, jobRequestSkills.jobRequestId))
            .leftJoin(skills, eq(jobRequestSkills.skillId, skills.id))
            .leftJoin(jobRequestCategories, eq(jobRequests.id, jobRequestCategories.jobRequestId))
            .leftJoin(serviceCategories, eq(jobRequestCategories.categoryId, serviceCategories.id))
            .where(eq(jobRequests.id, jobId));

        return results;
    }
}
