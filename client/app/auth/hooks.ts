import { useMutation, useQuery } from "@tanstack/react-query";
import { signin, signup, authenticate } from "./api/auth-api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

export const useAuthCheck = () => {
  return useQuery({
    queryKey: ["auth-check"],
    queryFn: authenticate,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSignIn = (userType: "user" | "service_provider") => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: signin,
    onSuccess: (response) => {
      if (response) {
        setUser(response || response);
        router.push(userType === "user" ? "/consumers" : "/service-provider");
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Authentication failed");
    },
  });
};

export const useSignUp = (userType: "user" | "service_provider") => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: signup,
    onSuccess: (response) => {
      if (response) {
        setUser(response || response);
        router.push(userType === "user" ? "/consumers" : "/service-provider");
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};
