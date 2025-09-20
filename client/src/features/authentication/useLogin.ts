import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface LoginData {
  status: string;
  token: string;
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
    };
  };
}

interface LoginVariables {
  email: string;
  password: string;
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginUser, isPending: isLoading } = useMutation<
    LoginData,
    Error,
    LoginVariables
  >({
    mutationFn: async ({ email, password }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}users/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const LoginData = await response.json();
      return LoginData;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], { ...data, isLoggedIn: true });
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { loginUser, isLoading };
}
