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

interface EditCabinVariables {
  formData: FormData;
  id: string;
}

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation<
    Cabin,
    Error,
    EditCabinVariables
  >({
    mutationFn: async ({ formData, id }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}cabins/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Couldn't edit cabin. Please try again."
        );
      }

      const editData = await response.json();
      return editData;
    },
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editCabin };
}
