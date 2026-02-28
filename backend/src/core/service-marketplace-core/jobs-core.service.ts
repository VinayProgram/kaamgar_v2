import { Inject, Injectable } from '@nestjs/common';
import { eq, and, sql } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../../db/database-connection.module';
import {
    jobRequests, JobRequest, NewJobRequest,
    jobRequestSkills, NewJobRequestSkill,
    jobRequestCategories, NewJobRequestCategory,
    jobApplicants, JobApplicant, NewJobApplicant
} from '../../db/schemas/jobs.schema';

@Injectable()
export class JobsCoreService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: Database
    ) { }

    // --- Job Request Methods ---

    async createJob(
        jobData: NewJobRequest,
        skillIds: string[],
        categoryIds: string[]
    ): Promise<JobRequest> {
        return await this.db.transaction(async (tx) => {
            const [job] = await tx.insert(jobRequests).values(jobData).returning();

            if (skillIds.length > 0) {
                await tx.insert(jobRequestSkills).values(
                    skillIds.map(skillId => ({ jobRequestId: job.id, skillId }))
                );
            }

            if (categoryIds.length > 0) {
                await tx.insert(jobRequestCategories).values(
                    categoryIds.map(categoryId => ({ jobRequestId: job.id, categoryId }))
                );
            }

            return job;
        });
    }

    async findAllJobs(): Promise<JobRequest[]> {
        return this.db.select().from(jobRequests).where(sql`${jobRequests.deletedAt} IS NULL`);
    }

    async findJobById(id: string): Promise<JobRequest | undefined> {
        const [job] = await this.db
            .select()
            .from(jobRequests)
            .where(and(eq(jobRequests.id, id), sql`${jobRequests.deletedAt} IS NULL`));
        return job;
    }

    async updateJob(id: string, data: Partial<NewJobRequest>): Promise<JobRequest | undefined> {
        const [updated] = await this.db
            .update(jobRequests)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(jobRequests.id, id))
            .returning();
        return updated;
    }

    async softDeleteJob(id: string): Promise<boolean> {
        const result = await this.db
            .update(jobRequests)
            .set({ deletedAt: new Date() })
            .where(eq(jobRequests.id, id))
            .returning();
        return result.length > 0;
    }

    // --- Applicant Methods ---

    async applyForJob(data: NewJobApplicant): Promise<JobApplicant> {
        return await this.db.transaction(async (tx) => {
            const [applicant] = await tx.insert(jobApplicants).values(data).returning();

            // Increment total applicants count on the job request
            await tx.update(jobRequests)
                .set({ totalApplicants: sql`${jobRequests.totalApplicants} + 1` })
                .where(eq(jobRequests.id, data.jobRequestId));

            return applicant;
        });
    }

    async getApplicantsForJob(jobRequestId: string): Promise<JobApplicant[]> {
        return this.db
            .select()
            .from(jobApplicants)
            .where(eq(jobApplicants.jobRequestId, jobRequestId));
    }

    async updateApplicantStatus(id: string, status: any): Promise<JobApplicant | undefined> {
        const [updated] = await this.db
            .update(jobApplicants)
            .set({ status, updatedAt: new Date() })
            .where(eq(jobApplicants.id, id))
            .returning();
        return updated;
    }
}
