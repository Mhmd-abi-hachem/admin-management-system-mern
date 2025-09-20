import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

interface LogoutData {
  status: string;
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { mutate: logoutUser, isPending: isLoading } = useMutation<
    LogoutData,
    Error,
    void
  >({
    mutationFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}users/logout`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to logout. Please try again.");

      const LogoutData = await response.json();
      return LogoutData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { logoutUser, isLoading };
}
