import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { BcryptUtil } from '../../common/bcrypt/bcrypt.util';
import { ConsumerCoreService } from '../../core/consumer-core/consumer-core.service';
import { NewUser, User } from '../../db/schemas/user.schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly consumerCore: ConsumerCoreService,
        private readonly jwtService: JwtService,
    ) { }

    async registerUser(data: NewUser): Promise<User> {
        return this.consumerCore.create(data);
    }

    async login(loginDto: LoginDto, response: Response): Promise<User> {
        const user = await this.consumerCore.findByEmail(loginDto.email);
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
                role: 'consumer',
            },
            { secret: process.env.CONSUMER_JWT_SECRET },
        );

        // Set cookie
        response.cookie('consumer_access_token', token, {
            httpOnly: true, // cannot be accessed by JS (security)
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });


        // Remove password from user object before returning
        const { password: _, ...result } = user;
        return result as User;
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
