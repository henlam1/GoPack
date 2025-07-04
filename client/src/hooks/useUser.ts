import { useQuery } from "@tanstack/react-query";
import { hydrateAPI } from "../services/api/users";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: hydrateAPI,
    staleTime: 60 * 5 * 1000, // 5 minutes
    retry: false,
  });
}
