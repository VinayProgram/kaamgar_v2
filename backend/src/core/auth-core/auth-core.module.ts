import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || 'your_fallback_secret',
            signOptions: { expiresIn: '1d' }, // token expires in 1 day
        }),
    ],
    exports: [JwtModule],
})
export class AuthCoreModule { }
