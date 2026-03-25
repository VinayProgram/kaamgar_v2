"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authenticate } from "./api/auth-api";
import { useAuthStore } from "@/store/auth-store";

import { useAuthCheck } from "./hooks";

interface AuthenticationWrapperProps {
  children: React.ReactNode;
  requiredRole: "user" | "service_provider";
}

export default function AuthenticationWrapper({
  children,
  requiredRole,
}: AuthenticationWrapperProps) {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const { data: userData, isLoading, isError } = useAuthCheck();

  useEffect(() => {
    if (!isLoading) {
      if (isError || !userData) {
        router.push("/auth/consumer/signin");
      } else {
        setUser(userData);
        const registrationType = userData.registrationType;

        if (registrationType === "user" && requiredRole === "service_provider") {
          router.push("/consumers");
        } else if (registrationType === "service_provider" && requiredRole === "user") {
          router.push("/service-provider");
        }
      }
    }
  }, [userData, isLoading, isError, requiredRole, router, setUser]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return <>{children}</>;
}
