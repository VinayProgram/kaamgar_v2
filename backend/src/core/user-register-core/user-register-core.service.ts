import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../../db/database-connection.module';
import { register_users, RegisterUser, NewRegisterUser } from '../../db/schemas/user-register.schema';
import { BcryptUtil } from '../../common/bcrypt/bcrypt.util';

@Injectable()
export class UserRegisterCoreService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: Database
    ) { }

    /**
     * Create a new user with password hashing
     */
    async create(data: NewRegisterUser): Promise<RegisterUser> {
        const userData = { ...data };

        // Hash password if it exists (for email/password registration)
        if (userData.password) {
            userData.password = await BcryptUtil.hashPassword(userData.password);
        }

        const [newUser] = await this.db
            .insert(register_users)
            .values(userData)
            .returning();

        return newUser;
    }

    /**
     * Get all registered users
     */
    async findAll(): Promise<RegisterUser[]> {
        return this.db.select().from(register_users);
    }

    /**
     * Find a user by ID
     */
    async findById(id: string): Promise<RegisterUser | undefined> {
        const [user] = await this.db
            .select()
            .from(register_users)
            .where(eq(register_users.id, id));
        return user;
    }

    /**
     * Find a user by email
     */
    async findByEmail(email: string): Promise<RegisterUser | undefined> {
        const [user] = await this.db
            .select()
            .from(register_users)
            .where(eq(register_users.email, email));
        return user;
    }

    /**
     * Update a user's information
     */
    async update(id: string, data: Partial<NewRegisterUser>): Promise<RegisterUser | undefined> {
        const updateData = { ...data, updatedAt: new Date() };

        // Hash password if it's being updated
        if (updateData.password) {
            updateData.password = await BcryptUtil.hashPassword(updateData.password);
        }

        const [updatedUser] = await this.db
            .update(register_users)
            .set(updateData)
            .where(eq(register_users.id, id))
            .returning();

        return updatedUser;
    }

    /**
     * Delete a user
     */
    async delete(id: string): Promise<boolean> {
        const result = await this.db
            .delete(register_users)
            .where(eq(register_users.id, id))
            .returning();

        return result.length > 0;
    }
}
