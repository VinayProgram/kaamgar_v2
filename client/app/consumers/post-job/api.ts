import api from "@/lib/api";
import { PostJobValues } from "./schema";

export const postJob = async (data: PostJobValues) => {
  const response = await api.post("/jobs/post-job", data);
  return response.data;
};
