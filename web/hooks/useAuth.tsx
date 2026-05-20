"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import useAuthStore from "@/store/auth/use-auth-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ZTAuthRegister, ZTAuthLogin, ZTAuthForgotPassword } from "@/types/zod/auth";

type ApiErrorResponse = {
  message?: string;
};

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setUser, logout: clearStore } = useAuthStore();

  // 1. Fetch Current User
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["auth-me"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/auth/me");
        return data.user;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // 2. Sync Query result with Zustand Store
  useEffect(() => {
    if (!isLoading) {
      setUser(user || null);
    }
  }, [user, isLoading, setUser]);

  // 3. Logout Mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      clearStore();
      queryClient.setQueryData(["auth-me"], null);
      router.push("/login");
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast.error(err.response?.data?.message || "Logout failed");
    },
  });

  // 4. Sign Up Mutation
  const signUpMutation = useMutation({
    mutationFn: async (payload: ZTAuthRegister) => {
      const { data } = await api.post("/auth/sign-up", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Account created successfully!");
      router.push("/login");
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast.error(err.response?.data?.message || "Registration failed");
    },
  });

  // 5. Sign In Initiate Mutation (1st step of 2FA)
  const signInInitiateMutation = useMutation({
    mutationFn: async (payload: Pick<ZTAuthLogin, "email" | "password">) => {
      const { data } = await api.post("/auth/login-initiate", payload);
      return data;
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast.error(err.response?.data?.message || "Invalid credentials");
    },
  });

  // 6. Sign In Verify Mutation (2nd step of 2FA)
  const signInVerifyMutation = useMutation({
    mutationFn: async (payload: ZTAuthLogin & { otp: string }) => {
      const { data } = await api.post("/auth/login-verify", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Login successful!");
      // Refetch user session
      queryClient.invalidateQueries({ queryKey: ["auth-me"] });
      router.push("/");
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast.error(err.response?.data?.message || "Invalid or expired OTP");
    },
  });

  // 7. Forgot Password Mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: async (payload: ZTAuthForgotPassword) => {
      const { data } = await api.post("/auth/forgot-password", payload);
      return data;
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast.error(err.response?.data?.message || "Failed to send reset code");
    },
  });

  // 8. Reset Password Mutation
  const resetPasswordMutation = useMutation({
    mutationFn: async (payload: { email: string; otp: string; password: string }) => {
      const { data } = await api.post("/auth/reset-password", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Password reset successful!");
      router.push("/login");
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast.error(err.response?.data?.message || "Failed to reset password");
    },
  });

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    
    signUp: signUpMutation.mutate,
    isSigningUp: signUpMutation.isPending,
    signUpError: signUpMutation.error,

    signInInitiate: signInInitiateMutation.mutateAsync,
    isSigningInInitiate: signInInitiateMutation.isPending,

    signInVerify: signInVerifyMutation.mutate,
    isSigningInVerify: signInVerifyMutation.isPending,

    forgotPassword: forgotPasswordMutation.mutateAsync,
    isForgotPasswordPending: forgotPasswordMutation.isPending,

    resetPassword: resetPasswordMutation.mutate,
    isResettingPassword: resetPasswordMutation.isPending,
  };
};