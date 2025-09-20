import { useQuery } from "@tanstack/react-query";
import React from "react";

export function useSettings() {
  const { isLoading, data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}settings`, {
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Failed to fetch settings data. Please try again."
        );
      }

      const settings = await response.json();
      return settings.data;
    },
  });
  return { isLoading, settings };
}
