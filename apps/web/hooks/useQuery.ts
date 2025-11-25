import { useEffect, useState } from "react";

interface UseQueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching data with loading and error states
 * @param queryFn - Async function that fetches the data
 * @param dependencies - Array of dependencies that trigger a refetch when changed
 */
export function useQuery<T>(
  queryFn: () => Promise<T>,
  dependencies: unknown[] = []
): UseQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await queryFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
}

