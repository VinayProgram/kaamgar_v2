import api from "@/lib/api";
import { CreateJobDto, PostJobResponse } from "./dto";

export const postJob = async (data: CreateJobDto): Promise<PostJobResponse> => {
  const response = await api.post<PostJobResponse>("/jobs/post-job", data);
  return response.data;
};


