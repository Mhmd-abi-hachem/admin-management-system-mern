import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

interface PasswordVariables {
  password: string;
  passwordConfirm: string;
}

export const useUpdatePassword = () => {
  const { mutate: updateUserPassword, isPending: isUpdating } = useMutation<
    void,
    Error,
    PasswordVariables
  >({
    mutationFn: async ({ password, passwordConfirm }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}users/updateMyPassword`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            passwordConfirm,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Failed to update your password. Please try again."
        );
      }
    },
    onSuccess: () => {
      toast.success("Password updated successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateUserPassword, isUpdating };
};
