import { Inject, Injectable } from '@nestjs/common';
import { eq, inArray } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../../db/database-connection.module';
import { serviceProviderSkills, ServiceProviderSkill, NewServiceProviderSkill } from '../../db/schemas/service-marketplace.schema';

@Injectable()
export class ServiceProviderSkillCoreService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: Database
    ) { }

    async getSkillsByProvider(serviceUserId: string): Promise<ServiceProviderSkill[]> {
        return this.db
            .select()
            .from(serviceProviderSkills)
            .where(eq(serviceProviderSkills.serviceUserId, serviceUserId));
    }

    async updateProviderSkills(serviceUserId: string, skillIds: string[]): Promise<void> {
        await this.db.transaction(async (tx) => {
            // Delete existing
            await tx.delete(serviceProviderSkills).where(eq(serviceProviderSkills.serviceUserId, serviceUserId));
            
            // Insert new
            if (skillIds.length > 0) {
                const values = skillIds.map(skillId => ({
                    serviceUserId,
                    skillId,
                }));
                await tx.insert(serviceProviderSkills).values(values);
            }
        });
    }
}
