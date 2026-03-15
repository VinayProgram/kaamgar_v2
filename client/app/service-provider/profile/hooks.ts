import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProviderProfile, updateProviderProfile } from "./api";
import { toast } from "sonner";

export const useProviderProfile = () => {
  return useQuery({
    queryKey: ["provider-profile"],
    queryFn: getProviderProfile,
  });
};

export const useUpdateProviderProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProviderProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["provider-profile"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });
};
