import { Injectable } from '@nestjs/common';
import { ConsumerCoreService } from '../../core/consumer-core/consumer-core.service';
import { NewUser, User } from '../../db/schemas/user.schema';

@Injectable()
export class UserService {
    constructor(private readonly consumerCore: ConsumerCoreService) { }

    async registerUser(data: NewUser): Promise<User> {
        return this.consumerCore.create(data);
    }

    async getAllUsers(): Promise<User[]> {
        return this.consumerCore.findAll();
    }

    async getUserById(id: string): Promise<User | undefined> {
        return this.consumerCore.findById(id);
    }

    async updateUser(id: string, data: Partial<NewUser>): Promise<User | undefined> {
        return this.consumerCore.update(id, data);
    }

    async deleteUser(id: string): Promise<boolean> {
        return this.consumerCore.delete(id);
    }
}
