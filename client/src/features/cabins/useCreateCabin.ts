import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

interface Cabin {
  _id: string;
  cabinName: string;
  cabinImage: string;
  maxCapacity: number;
  price: number;
  discount: number;
  description: string;
}

interface CreateCabinVariables {
  formData: FormData;
}

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isPending: isAdding } = useMutation<
    Cabin,
    Error,
    CreateCabinVariables
  >({
    mutationFn: async ({ formData }) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}cabins`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message ||
            "An error occured while creating cabin. Please try again."
        );
      }

      const cabinData = await response.json();
      return cabinData;
    },
    onSuccess: () => {
      toast.success("New cabin created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isAdding, createCabin };
}
