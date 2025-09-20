import { useQuery } from "@tanstack/react-query";

export function UseStats() {
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}stats`, {
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message ||
            "An error occured while fetching stats data. Please try again."
        );
      }

      const Stats = await response.json();
      return Stats.data;
    },
  });

  return { stats, isLoadingStats };
}
