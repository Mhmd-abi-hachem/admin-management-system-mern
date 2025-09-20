import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

export const useAllCabins = () => {
  const { isLoading: isLoadingCabins, data: getCabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}cabins`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cabins. Please try again.");
      }
      const Cabins = await response.json();
      return Cabins.data;
    },
  });
  return { isLoadingCabins, getCabins };
};
