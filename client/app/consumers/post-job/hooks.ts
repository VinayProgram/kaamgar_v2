import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getJobById, postJob } from "./api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: postJob,
    onSuccess: () => {
      toast.success("Job posted successfully!");
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      router.push("/consumers/my-jobs");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to post job");
    },
  });
};


export const useGetJobById = (jobId: string) => {
  return useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJobById(jobId),
  });
};
