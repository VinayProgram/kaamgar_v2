import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { NewUser, User } from 'src/db/schema';
import { AuthCoreService } from 'src/core/auth-core/auth-core.service';
import { AuthCoreUtilsService } from 'src/core/auth-core/auth-core-utils.service';
import { BcryptUtil } from 'src/common/bcrypt/bcrypt.util';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authCoreService: AuthCoreService,
        private readonly authCoreUtilsService: AuthCoreUtilsService,
    ) { }

    async registerUser(data: NewUser): Promise<User> {
        return this.authCoreService.create(data);
    }

    async login(loginDto: LoginDto, req: Request, response: Response): Promise<User> {
        const user = await this.authCoreService.findByEmail(loginDto.email);

        if (!user || !user.password || !user.registrationType || user.registrationType !== loginDto.registrationType) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await BcryptUtil.comparePassword(loginDto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const secret = user.registrationType == 'user' ? process.env.CONSUMER_JWT_SECRET : process.env.SERVICE_PROVIDER_JWT_SECRET;
        // Sign the token
        const token = await this.jwtService.signAsync(
            {
                sub: user.id,
                email: user.email,
                role: user.registrationType,
            },
            { secret: secret },
        );

        // Clean up conflicting cookies
        this.authCoreUtilsService.handleConflictingCookies(user.registrationType, response);

        // Set cookie
        response.cookie(user.registrationType, token, {
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
