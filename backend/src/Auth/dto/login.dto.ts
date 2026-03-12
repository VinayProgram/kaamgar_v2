import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    registrationType: z.enum(['user', 'service_provider']),
});

export type LoginDto = z.infer<typeof LoginSchema>;
