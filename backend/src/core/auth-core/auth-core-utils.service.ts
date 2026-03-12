import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AuthCoreUtilsService {
    /**
     * Clears conflicting auth cookies when a user logs in with a different role.
     * For example, if logging in as 'user', it clears 'service_provider' and vice versa.
     */
    handleConflictingCookies(currentRole: string, response: Response) {
        const cookiesToClear = ['user', 'service_provider'];
        
        cookiesToClear.forEach(cookieName => {
            if (cookieName !== currentRole) {
                response.clearCookie(cookieName, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                });
            }
        });
    }

    /**
     * Clears all auth cookies.
     */
    clearAllCookies(response: Response) {
        const cookiesToClear = ['user', 'service_provider'];
        
        cookiesToClear.forEach(cookieName => {
            response.clearCookie(cookieName, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
            });
        });
    }
}
