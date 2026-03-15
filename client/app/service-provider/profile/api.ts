import api from "@/lib/api";
import { ServiceProviderProfileDto, UpdateProfileDto } from "./dto";

export const getProviderProfile = async (): Promise<ServiceProviderProfileDto> => {
  const response = await api.get<ServiceProviderProfileDto>("/service-provider/profile");
  return response.data;
};

export const updateProviderProfile = async (data: UpdateProfileDto): Promise<ServiceProviderProfileDto> => {
  const response = await api.post<ServiceProviderProfileDto>("/service-provider/profile", data);
  return response.data;
};
