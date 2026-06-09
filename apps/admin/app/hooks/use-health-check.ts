import { useQuery } from "@tanstack/react-query";

export interface HealthCheckResponse {
  status: "ok" | "error";
  timestamp: string;
  version: string;
  message: string;
  error?: string;
}

const API_BASE = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/api";

export function useHealthCheck() {
  return useQuery<HealthCheckResponse>({
    queryKey: ["health"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/health`);
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.statusText}`);
      }
      return response.json();
    },
    refetchInterval: 1000 * 30, // Refetch every 30 seconds
  });
}
