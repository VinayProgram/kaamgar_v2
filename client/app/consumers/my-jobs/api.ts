import api from "@/lib/api";
import { JobRequest } from "./dto";

export const getMyJobs = async (): Promise<JobRequest[]> => {
  const response = await api.get<JobRequest[]>("/jobs/my-jobs");
  return response.data;
};


