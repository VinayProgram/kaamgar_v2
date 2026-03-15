import { useQuery } from "@tanstack/react-query";
import { getAvailableJobs } from "./api";

export const useAvailableJobs = () => {
  return useQuery({
    queryKey: ["available-jobs"],
    queryFn: getAvailableJobs,
  });
};
