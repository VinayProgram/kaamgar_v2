import { z } from 'zod';

export const RegisterUserSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters').optional(),
    registrationType: z.enum(['user', 'service_provider']),
    oAuthProvider: z.string().optional(),
    oAuthId: z.string().optional(),
}).refine((data) => {
    if (!data.oAuthProvider && !data.oAuthId) {
        return !!data.password;
    }
    return true;
}, {
    message: "Password is required for email/password registration",
    path: ["password"],
});

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>;
