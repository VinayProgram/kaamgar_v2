import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../../db/database-connection.module';
import { serviceProviderWorkHistory, ServiceProviderWorkHistory, NewServiceProviderWorkHistory } from '../../db/schemas/service-marketplace.schema';

@Injectable()
export class WorkHistoryCoreService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: Database
    ) { }

    async addWorkHistory(data: NewServiceProviderWorkHistory): Promise<ServiceProviderWorkHistory> {
        const [history] = await this.db.insert(serviceProviderWorkHistory).values(data).returning();
        return history;
    }

    async getWorkHistoryByProvider(serviceUserId: string): Promise<ServiceProviderWorkHistory[]> {
        return this.db
            .select()
            .from(serviceProviderWorkHistory)
            .where(eq(serviceProviderWorkHistory.serviceUserId, serviceUserId));
    }

    async updateWorkHistory(id: string, data: Partial<NewServiceProviderWorkHistory>): Promise<ServiceProviderWorkHistory | undefined> {
        const [updated] = await this.db
            .update(serviceProviderWorkHistory)
            .set(data)
            .where(eq(serviceProviderWorkHistory.id, id))
            .returning();
        return updated;
    }

    async deleteWorkHistory(id: string): Promise<boolean> {
        const result = await this.db
            .delete(serviceProviderWorkHistory)
            .where(eq(serviceProviderWorkHistory.id, id))
            .returning();
        return result.length > 0;
    }
}
