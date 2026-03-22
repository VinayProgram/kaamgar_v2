import { z } from "zod";

export const postJobSchema = z.object({
  jobRequestType: z.enum(["instant", "scheduled", "recurring"]),
  requiredAt: z.string().optional().refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  validOpenTill: z.string().min(1, "Expiration date is required").refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: z.string().optional(), // Adding address for UI purposes
  }),
  jobDescription: z.string().min(10, "Description must be at least 10 characters"),
  priceType: z.enum(["fixed", "negotiable", "range"]),
  budgetMin: z.number().optional(),
  budgetMax: z.number().optional(),
  currency: z.string().default("INR"),
  skillIds: z.array(z.string().uuid()).min(1, "At least one skill is required"),
  categoryIds: z.array(z.string().uuid()).min(1, "At least one category is required"),
}).refine(data => {
  if (data.priceType === 'range') {
    return data.budgetMax !== undefined && data.budgetMax >= (data.budgetMin || 0);
  }
  return true;
}, {
  message: "Max budget must be greater than or equal to min budget",
  path: ["budgetMax"]
});

export type PostJobValues = z.infer<typeof postJobSchema>;
