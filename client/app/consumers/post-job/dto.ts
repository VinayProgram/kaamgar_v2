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



export interface JobRequestResponseById {
  job_requests: JobRequests
  job_request_skills: JobRequestSkills
  skills: Skills
  job_request_categories: JobRequestCategories
  service_categories: ServiceCategories
}

export interface JobRequests {
  id: string
  jobRequestType: string
  requiredAt: any
  validOpenTill: string
  location: Location
  jobDescription: string
  priceType: string
  budgetMin: string
  budgetMax: string
  currency: string
  consumerUserId: string
  status: string
  assignedServiceProviderId: any
  totalApplicants: number
  createdAt: string
  updatedAt: string
  deletedAt: any
}

export interface Location {
  x: number
  y: number
}

export interface JobRequestSkills {
  id: string
  jobRequestId: string
  skillId: string
}

export interface Skills {
  id: string
  name: string
  slug: string
  description: string
  createdAt: string
}

export interface JobRequestCategories {
  id: string
  jobRequestId: string
  categoryId: string
}

export interface ServiceCategories {
  id: string
  name: string
  slug: string
  description: string
  parentCategoryId: any
  createdAt: string
}
