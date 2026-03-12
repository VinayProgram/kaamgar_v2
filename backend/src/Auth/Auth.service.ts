import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { NewUser, User } from 'src/db/schema';
import { AuthCoreService } from 'src/core/auth-core/auth-core.service';
import { BcryptUtil } from 'src/common/bcrypt/bcrypt.util';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authCoreService: AuthCoreService,
    ) { }

    async registerUser(data: NewUser): Promise<User> {
        return this.authCoreService.create(data);
    }

    async login(loginDto: LoginDto, response: Response): Promise<User> {
        const user = await this.authCoreService.findByEmail(loginDto.email);
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
        return this.authCoreService.findAll();
    }

    async getUserById(id: string): Promise<User | undefined> {
        return this.authCoreService.findById(id);
    }

    async updateUser(id: string, data: Partial<NewUser>): Promise<User | undefined> {
        return this.authCoreService.update(id, data);
    }

    async deleteUser(id: string): Promise<boolean> {
        return this.authCoreService.delete(id);
    }
}
