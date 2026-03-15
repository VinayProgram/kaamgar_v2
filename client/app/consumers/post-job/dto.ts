export type JobRequestType = "instant" | "scheduled" | "recurring";
export type PriceType = "fixed" | "negotiable" | "range";

export interface CreateJobDto {
  jobRequestType: JobRequestType;
  requiredAt?: string;
  validOpenTill: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  jobDescription: string;
  priceType: PriceType;
  budgetMin?: number;
  budgetMax?: number;
  currency: string;
  skillIds: string[];
  categoryIds: string[];
}

export interface PostJobResponse {
  id: string;
  message: string;
}
