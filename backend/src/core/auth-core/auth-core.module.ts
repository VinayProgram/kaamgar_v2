import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthCoreService } from './auth-core.service';

@Global()
@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || 'your_fallback_secret',
            signOptions: { expiresIn: '1d' }, // token expires in 1 day
        }),
    ],
    providers: [AuthCoreService],
    exports: [JwtModule, AuthCoreService],
})
export class AuthCoreModule { }
