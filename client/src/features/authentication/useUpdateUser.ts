import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

interface UpdateUserData {
  status: string;
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      avatar: string;
    };
  };
}

interface UpdateUserVariables {
  formData: FormData;
}

export const useUpdateUser = () => {
  const { mutate: updateUser, isPending: isUpdating } = useMutation<
    UpdateUserData,
    Error,
    UpdateUserVariables
  >({
    mutationFn: async ({ formData }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}users/updateMe`,
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message ||
            "An error occured while updating your data. Please try again."
        );
      }

      const updatedUser = await response.json();
      return updatedUser;
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateUser, isUpdating };
};
