import { Injectable } from '@nestjs/common';
import { UserRegisterCoreService } from '../core/user-register-core/user-register-core.service';
import { NewRegisterUser, RegisterUser } from '../db/schemas/user-register.schema';

@Injectable()
export class UserRegisterService {
    constructor(private readonly userRegisterCore: UserRegisterCoreService) { }

    async registerUser(data: NewRegisterUser): Promise<RegisterUser> {
        return this.userRegisterCore.create(data);
    }

    async getAllUsers(): Promise<RegisterUser[]> {
        return this.userRegisterCore.findAll();
    }

    async getUserById(id: string): Promise<RegisterUser | undefined> {
        return this.userRegisterCore.findById(id);
    }

    async updateUser(id: string, data: Partial<NewRegisterUser>): Promise<RegisterUser | undefined> {
        return this.userRegisterCore.update(id, data);
    }

    async deleteUser(id: string): Promise<boolean> {
        return this.userRegisterCore.delete(id);
    }
}
