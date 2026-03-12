"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authenticate } from "./api/auth-api";
import { useAuthStore } from "@/store/auth-store";

interface AuthenticationWrapperProps {
  children: React.ReactNode;
  requiredRole: "user" | "service_provider";
}

export default function AuthenticationWrapper({
  children,
  requiredRole,
}: AuthenticationWrapperProps) {
  const router = useRouter();
  const { setUser, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authenticate();
        
        if (userData) {
          setUser(userData);
          
          const registrationType = userData.registrationType;

          // Redirection logic based on user type and current path/requirement
          if (registrationType === "user" && requiredRole === "service_provider") {
            router.push("/consumers");
          } else if (registrationType === "service_provider" && requiredRole === "user") {
            router.push("/service-provider");
          } else {
            setLoading(false);
          }
        } else {
          // Not authenticated
          router.push("/auth/consumer/signin");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        router.push("/auth/consumer/signin");
      }
    };

    checkAuth();
  }, [requiredRole, router, setUser]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-navy border-t-transparent"></div>
      </div>
    );
  }

  return <>{children}</>;
}
