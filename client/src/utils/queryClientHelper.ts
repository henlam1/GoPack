import { QueryClient } from '@tanstack/react-query';

export function logQueryKeys(queryClient: QueryClient) {
  // Log all cached query keys
  console.log(
    queryClient
      .getQueryCache()
      .getAll()
      .map((q) => q.queryKey),
  );
}
