export interface ServiceProviderProfileDto {
  id?: string;
  serviceUserId: string;
  bio?: string;
  tagline?: string;
  profilePictureUrl?: string;
  yearsOfExperience?: number;
  hourlyRate?: number;
  addressLine1: string;

  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  categoryIds: string[];
  skillIds: string[];
  currentLocation?: {
    id: string;
    serviceUserId: string;
    location: { x: number; y: number };
    accuracyMeters?: string;
    isOnline?: boolean;
    lastUpdatedAt: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export type UpdateProfileDto = Partial<Omit<ServiceProviderProfileDto, 'id' | 'serviceUserId' | 'createdAt' | 'updatedAt' | 'currentLocation'>> & {
  latitude?: number;
  longitude?: number;
};

