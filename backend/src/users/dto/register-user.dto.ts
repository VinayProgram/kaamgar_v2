import { z } from 'zod';

export const RegisterUserSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().optional(),
    consumerType: z.enum(['consumer', 'service-provider']).default('consumer'),

    // standard registration
    password: z.string().min(6, 'Password must be at least 6 characters').optional(),

    // Google/OAuth registration
    oAuthProvider: z.string().optional(),
    oAuthId: z.string().optional(),
}).refine((data) => {
    // If not an OAuth login, password must be present
    if (!data.oAuthProvider && !data.oAuthId) {
        return !!data.password;
    }
    return true;
}, {
    message: "Password is required for email/password registration",
    path: ["password"],
});

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>;
