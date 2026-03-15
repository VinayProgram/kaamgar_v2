import api from "@/lib/api";
import { AvailableJobDto } from "./dto";

export const getAvailableJobs = async (): Promise<AvailableJobDto[]> => {
  const response = await api.get<AvailableJobDto[]>("/service-provider/fetch-jobs");
  return response.data;
};
