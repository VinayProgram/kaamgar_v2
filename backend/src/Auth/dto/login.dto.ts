import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    loginUserType: z.enum(['user', 'service-provider']),
});

export type LoginDto = z.infer<typeof LoginSchema>;
