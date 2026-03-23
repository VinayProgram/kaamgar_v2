import api from "@/lib/api";

export interface ServiceProviderSearchResult {
  userId: string;
  fullName: string;
  tagline: string;
  bio: string;
  profilePictureUrl: string;
  city: string;
  yearsOfExperience: number;
  hourlyRate: string;
  skills: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  distance?: number;
}

export const searchServiceProviders = async (params: {
  categoryId?: string;
  skillIds?: string[];
  lat?: number;
  lng?: number;
  query?: string;
}): Promise<ServiceProviderSearchResult[]> => {
  const response = await api.get<ServiceProviderSearchResult[]>("/consumer/service-providers/search", { params });
  return response.data;
};
