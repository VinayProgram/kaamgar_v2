import api from "@/lib/api";
import { JobRequest } from "./schema";

export const getMyJobs = async (): Promise<JobRequest[]> => {
  const response = await api.get("/jobs/my-jobs");
  return response.data;
};
