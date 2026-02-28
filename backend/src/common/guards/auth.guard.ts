import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const url = request.url;
        const isServiceProvider = request.cookies?.provider_access_token;

        // Select the appropriate cookie name and secret
        const cookieName = isServiceProvider ? 'provider_access_token' : 'consumer_access_token';
        const secret = isServiceProvider
            ? process.env.SERVICE_PROVIDER_JWT_SECRET
            : process.env.CONSUMER_JWT_SECRET;

        // 2. Extract token from Header or Cookie
        const token = request.cookies?.[cookieName];

        if (!token) {
            throw new UnauthorizedException('No token found');
        }

        try {
            // 3. Verify with the specific secret
            const payload = await this.jwtService.verifyAsync(token, { secret });

            // 💡 Attach payload to request for controllers to use
            request['user'] = payload;

        } catch (err) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        return true;
    }
}
