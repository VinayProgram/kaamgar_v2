import { z } from "zod";

export const jobRequestSchema = z.object({
  id: z.string().uuid(),
  jobRequestType: z.enum(["instant", "scheduled", "recurring"]),
  requiredAt: z.string().nullable().optional(),
  validOpenTill: z.string(),
  location: z.any(), // Geometry objects can be complex, usually we get string or object
  jobDescription: z.string(),
  priceType: z.enum(["fixed", "negotiable", "range"]),
  budgetMin: z.string().nullable().optional(),
  budgetMax: z.string().nullable().optional(),
  currency: z.string(),
  status: z.enum([
    "draft",
    "open",
    "expired",
    "assigned",
    "in_progress",
    "completed",
    "cancelled"
  ]),
  totalApplicants: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type JobRequest = z.infer<typeof jobRequestSchema>;
