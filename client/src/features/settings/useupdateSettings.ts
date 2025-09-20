import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

interface Settings {
  _id: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

interface UpdateSettingsVariables {
  updatedSettingData: Partial<Settings>;
  id: string;
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isPending: isUpdating } = useMutation<
    Settings,
    Error,
    UpdateSettingsVariables
  >({
    mutationFn: async ({ updatedSettingData, id }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}settings/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSettingData),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Couldn't update settings. Please try again."
        );
      }

      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      toast.success("Settings successfully updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
  return { isUpdating, updateSetting };
}
