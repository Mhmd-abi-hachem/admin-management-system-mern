import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

interface SignupData {
  status: string;
}

interface SignupVariables {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const useSignup = () => {
  const { mutate: createUser, isPending: isLoading } = useMutation<
    SignupData,
    Error,
    SignupVariables
  >({
    mutationFn: async ({ name, email, password, passwordConfirm }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}users/signup`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, passwordConfirm }),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to signup. Please try again.");
      }

      const SignupData = await response.json();
      return SignupData;
    },
    onSuccess: () => {
      toast.success("User created");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createUser, isLoading };
};
