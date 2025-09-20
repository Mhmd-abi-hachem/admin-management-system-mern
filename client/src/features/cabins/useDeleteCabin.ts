import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

type DeleteCabinVariables = string;

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation<
    boolean,
    Error,
    DeleteCabinVariables
  >({
    mutationFn: async (id) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}cabins/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Failed to delete cabin. Please try again."
        );
      }

      return true; // !! True means success
    },

    onSuccess: () => {
      toast.success("Cabin successfully deleted.");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },

    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabin };
}
