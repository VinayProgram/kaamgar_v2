import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../../db/database-connection.module';
import { BcryptUtil } from '../../common/bcrypt/bcrypt.util';
import { NewServiceUser, ServiceUser, serviceUsers } from '../../db/schemas/service-users.schema';

@Injectable()
export class ServiceProviderCoreService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: Database
    ) { }

    /**
     * Create a new service provider user with password hashing
     */
    async create(data: NewServiceUser): Promise<ServiceUser> {
        const userData = { ...data };

        // Hash password if it exists (for email/password registration)
        if (userData.password) {
            userData.password = await BcryptUtil.hashPassword(userData.password);
        }

        const [newUser] = await this.db
            .insert(serviceUsers)
            .values(userData)
            .returning();

        return newUser;
    }

    /**
     * Get all registered service providers
     */
    async findAll(): Promise<ServiceUser[]> {
        return this.db.select().from(serviceUsers);
    }

    /**
     * Find a service provider by ID
     */
    async findById(id: string): Promise<ServiceUser | undefined> {
        const [user] = await this.db
            .select()
            .from(serviceUsers)
            .where(eq(serviceUsers.id, id));
        return user;
    }

    /**
     * Find a service provider by email
     */
    async findByEmail(email: string): Promise<ServiceUser | undefined> {
        const [user] = await this.db
            .select()
            .from(serviceUsers)
            .where(eq(serviceUsers.email, email));
        return user;
    }

    /**
     * Update a service provider's information
     */
    async update(id: string, data: Partial<NewServiceUser>): Promise<ServiceUser | undefined> {
        const updateData = { ...data, updatedAt: new Date() };

        // Hash password if it's being updated
        if (updateData.password) {
            updateData.password = await BcryptUtil.hashPassword(updateData.password);
        }

        const [updatedUser] = await this.db
            .update(serviceUsers)
            .set(updateData)
            .where(eq(serviceUsers.id, id))
            .returning();

        return updatedUser;
    }

    /**
     * Delete a service provider
     */
    async delete(id: string): Promise<boolean> {
        const result = await this.db
            .delete(serviceUsers)
            .where(eq(serviceUsers.id, id))
            .returning();

        return result.length > 0;
    }
}
