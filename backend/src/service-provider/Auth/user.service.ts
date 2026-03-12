import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { BcryptUtil } from '../../common/bcrypt/bcrypt.util';
import { ServiceProviderCoreService } from '../../core/service-provider-core/service-provider-core.service';
import { NewServiceUser, ServiceUser } from '../../db/schemas/service-users.schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly serviceProviderCore: ServiceProviderCoreService,
        private readonly jwtService: JwtService,
    ) { }

    async registerUser(data: NewServiceUser): Promise<ServiceUser> {
        return this.serviceProviderCore.create(data);
    }

    async login(loginDto: LoginDto, response: Response): Promise<ServiceUser> {
        const user = await this.serviceProviderCore.findByEmail(loginDto.email);
        if (!user || !user.password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await BcryptUtil.comparePassword(loginDto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Sign the token
        const token = await this.jwtService.signAsync(
            {
                sub: user.id,
                email: user.email,
                role: 'service-provider',
            },
            { secret: process.env.SERVICE_PROVIDER_JWT_SECRET },
        );

        // Set cookie
        response.cookie('provider_access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });


        const { password: _, ...result } = user;
        return result as ServiceUser;
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
