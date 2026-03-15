import { z } from 'zod';

export const CreateJobSchema = z.object({
  jobRequestType: z.enum(["instant", "scheduled", "recurring"]),
  requiredAt: z.preprocess((val) => (val ? new Date(val as string) : undefined), z.date().optional()),
  validOpenTill: z.preprocess((val) => new Date(val as string), z.date()),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  jobDescription: z.string().min(10, "Description must be at least 10 characters"),
  priceType: z.enum(["fixed", "negotiable", "range"]),
  budgetMin: z.number().optional(),
  budgetMax: z.number().optional(),
  currency: z.string().default("INR"),
  skillIds: z.array(z.string().uuid()).min(1, "At least one skill is required"),
  categoryIds: z.array(z.string().uuid()).min(1, "At least one category is required"),
}).refine(data => {
  if (data.priceType === 'range' || data.priceType === 'fixed') {
    return data.budgetMin !== undefined;
  }
  return true;
}, {
  message: "budgetMin is required for fixed or range price types",
  path: ["budgetMin"]
}).refine(data => {
  if (data.priceType === 'range') {
    return data.budgetMax !== undefined && data.budgetMax >= (data.budgetMin || 0);
  }
  return true;
}, {
  message: "budgetMax is required and must be greater than budgetMin for range price type",
  path: ["budgetMax"]
});

export type CreateJobDto = z.infer<typeof CreateJobSchema>;
