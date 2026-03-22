import api from "@/lib/api";
import { CreateJobDto, JobRequestResponseById, PostJobResponse } from "./dto";

export const postJob = async (data: CreateJobDto): Promise<PostJobResponse> => {
  const response = await api.post<PostJobResponse>("/jobs/post-job", data);
  return response.data;
};

export const getJobById = async (jobId: string): Promise<JobRequestResponseById[]> => {
  const response = await api.get<JobRequestResponseById[]>(`/jobs/${jobId}`);
  return response.data;
};