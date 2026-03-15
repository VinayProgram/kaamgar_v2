export type JobRequestType = "instant" | "scheduled" | "recurring";
export type JobStatus = "draft" | "open" | "expired" | "assigned" | "in_progress" | "completed" | "cancelled";
export type PriceType = "fixed" | "negotiable" | "range";

export interface JobRequest {
  id: string;
  jobRequestType: JobRequestType;
  requiredAt?: string | null;
  validOpenTill: string;
  location: any; // Geometry object
  jobDescription: string;
  priceType: PriceType;
  budgetMin?: string | null;
  budgetMax?: string | null;
  currency: string;
  status: JobStatus;
  totalApplicants: number;
  createdAt: string;
  updatedAt: string;
}
