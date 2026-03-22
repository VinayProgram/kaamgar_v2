import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getJobById, postJob, updateJob } from "./api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreateJobDto } from "./dto";

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


export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ data, id }: { data: CreateJobDto, id: string }) => updateJob(data, id),
    onSuccess: () => {
      toast.success("Job updated successfully!");
      queryClient.invalidateQueries();
      router.push("/consumers/my-jobs");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update job");
    },
  });
};

