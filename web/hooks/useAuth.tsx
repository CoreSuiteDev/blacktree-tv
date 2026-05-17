"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import useAuthStore from "@/store/auth/use-auth-store";
import { useEffect } from "react";

export const useAuth = () => {
  const queryClient = useQueryClient();
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
        throw err;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // 2. Sync Query result with Zustand Store
  useEffect(() => {
    if (!isLoading) {
      setUser(user);
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
      window.location.href = "/login";
    },
  });

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    logout: logoutMutation.mutate,
  };
};