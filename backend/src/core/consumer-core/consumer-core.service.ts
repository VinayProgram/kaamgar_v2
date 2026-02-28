import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../../db/database-connection.module';
import { BcryptUtil } from '../../common/bcrypt/bcrypt.util';
import { NewUser, User, users } from '../../db/schemas/user.schema';

@Injectable()
export class ConsumerCoreService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: Database
    ) { }

    /**
     * Create a new consumer user with password hashing
     */
    async create(data: NewUser): Promise<User> {
        const userData = { ...data };

        // Hash password if it exists (for email/password registration)
        if (userData.password) {
            userData.password = await BcryptUtil.hashPassword(userData.password);
        }

        const [newUser] = await this.db
            .insert(users)
            .values(userData)
            .returning();

        return newUser;
    }

    /**
     * Get all registered consumers
     */
    async findAll(): Promise<User[]> {
        return this.db.select().from(users);
    }

    /**
     * Find a consumer by ID
     */
    async findById(id: string): Promise<User | undefined> {
        const [user] = await this.db
            .select()
            .from(users)
            .where(eq(users.id, id));
        return user;
    }

    /**
     * Find a consumer by email
     */
    async findByEmail(email: string): Promise<User | undefined> {
        const [user] = await this.db
            .select()
            .from(users)
            .where(eq(users.email, email));
        return user;
    }

    /**
     * Update a consumer's information
     */
    async update(id: string, data: Partial<NewUser>): Promise<User | undefined> {
        const updateData = { ...data, updatedAt: new Date() };

        // Hash password if it's being updated
        if (updateData.password) {
            updateData.password = await BcryptUtil.hashPassword(updateData.password);
        }

        const [updatedUser] = await this.db
            .update(users)
            .set(updateData)
            .where(eq(users.id, id))
            .returning();

        return updatedUser;
    }

    /**
     * Delete a consumer
     */
    async delete(id: string): Promise<boolean> {
        const result = await this.db
            .delete(users)
            .where(eq(users.id, id))
            .returning();

        return result.length > 0;
    }
}
