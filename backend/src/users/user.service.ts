import { Injectable } from '@nestjs/common';
import { UserCoreService } from '../core/user-core/user-core.service';
import { NewUser, User } from '../db/schemas/user.schema';

@Injectable()
export class UserService {
    constructor(private readonly userCore: UserCoreService) { }

    async registerUser(data: NewUser): Promise<User> {
        return this.userCore.create(data);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userCore.findAll();
    }

    async getUserById(id: string): Promise<User | undefined> {
        return this.userCore.findById(id);
    }

    async updateUser(id: string, data: Partial<NewUser>): Promise<User | undefined> {
        return this.userCore.update(id, data);
    }

    async deleteUser(id: string): Promise<boolean> {
        return this.userCore.delete(id);
    }
}

