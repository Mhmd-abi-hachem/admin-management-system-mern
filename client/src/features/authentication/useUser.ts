import { useQuery } from "@tanstack/react-query";
import React from "react";

export function useUser() {
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}users/is-logged-in`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Failed to fetch user info. Please try again."
        );
      }

      const Userdata = await response.json();
      return Userdata;
    },
  });
  return { user, isLoadingUser };
}
