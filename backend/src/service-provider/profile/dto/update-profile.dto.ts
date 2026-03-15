import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  bio: z.string().optional(),
  tagline: z.string().optional(),
  yearsOfExperience: z.number().int().min(0).optional(),
  hourlyRate: z.number().min(0).optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  categoryIds: z.array(z.string().uuid()).optional(),
  skillIds: z.array(z.string().uuid()).optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});


export type UpdateProfileDto = z.infer<typeof UpdateProfileSchema>;
