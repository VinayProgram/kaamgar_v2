import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../../db/database-connection.module';
import {
    serviceProviderSkills, ServiceProviderSkill, NewServiceProviderSkill
} from '../../db/schemas/service-marketplace.schema';
import { skills, Skill, NewSkill } from '../../db/schemas/skills.schema';


@Injectable()
export class SkillCoreService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: Database
    ) { }

    // --- Master Skills Methods ---
    async createSkill(data: NewSkill): Promise<Skill> {
        const [skill] = await this.db.insert(skills).values(data).returning();
        return skill;
    }

    async findAllSkills(): Promise<Skill[]> {
        return this.db.select().from(skills);
    }

    // --- Provider Skills Mapping Methods ---
    async addSkillToProvider(data: NewServiceProviderSkill): Promise<ServiceProviderSkill> {
        const [skill] = await this.db.insert(serviceProviderSkills).values(data).returning();
        return skill;
    }

    async getSkillsByProvider(serviceUserId: string): Promise<ServiceProviderSkill[]> {
        return this.db
            .select()
            .from(serviceProviderSkills)
            .where(eq(serviceProviderSkills.serviceUserId, serviceUserId));
    }

    async deleteProviderSkill(id: string): Promise<boolean> {
        const result = await this.db
            .delete(serviceProviderSkills)
            .where(eq(serviceProviderSkills.id, id))
            .returning();
        return result.length > 0;
    }
}

