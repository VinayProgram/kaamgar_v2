import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        // TODO: Implement your authentication logic here
        // Example: Check for a JWT token in the header or cookie
        // const token = this.extractTokenFromHeader(request);
        // if (!token) {
        //   throw new UnauthorizedException();
        // }
        // try {
        //   const payload = await this.jwtService.verifyAsync(token, { secret: '...' });
        //   request['user'] = payload;
        // } catch {
        //   throw new UnauthorizedException();
        // }

        // For now, let's just deny access to non-public routes so you can see it working
        // You can change this to 'return true' temporarily if you are still developing
        const isAuthenticated = !!request.cookies['access_token'] || !!request.headers['authorization'];

        if (!isAuthenticated) {
            throw new UnauthorizedException('This route is protected. Please provide a valid token.');
        }

        return true;
    }
}
