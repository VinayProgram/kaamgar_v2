import { Injectable } from '@nestjs/common';
import { ServiceProviderCoreService } from '../../core/service-provider-core/service-provider-core.service';
import { NewServiceUser, ServiceUser } from '../../db/schemas/service-users.schema';

@Injectable()
export class UserService {
    constructor(private readonly serviceProviderCore: ServiceProviderCoreService) { }

    async registerUser(data: NewServiceUser): Promise<ServiceUser> {
        return this.serviceProviderCore.create(data);
    }

    async getAllUsers(): Promise<ServiceUser[]> {
        return this.serviceProviderCore.findAll();
    }

    async getUserById(id: string): Promise<ServiceUser | undefined> {
        return this.serviceProviderCore.findById(id);
    }

    async updateUser(id: string, data: Partial<NewServiceUser>): Promise<ServiceUser | undefined> {
        return this.serviceProviderCore.update(id, data);
    }

    async deleteUser(id: string): Promise<boolean> {
        return this.serviceProviderCore.delete(id);
    }
}
