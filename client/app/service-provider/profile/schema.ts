import { z } from 'zod';

export const profileSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  bio: z.string().optional().default(""),
  tagline: z.string().optional().default(""),
  yearsOfExperience: z.coerce.number().int().min(0).default(0),
  hourlyRate: z.coerce.number().min(0).default(0),
  addressLine1: z.string().min(5, "Address is too short"),
  addressLine2: z.string().optional().default(""),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(5, "Valid postal code required"),
  country: z.string().min(2).default("India"),
  categoryIds: z.array(z.string().uuid()).min(1, "Select at least one category"),
  skillIds: z.array(z.string().uuid()).min(1, "Select at least one skill"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type ProfileValues = z.infer<typeof profileSchema>;
