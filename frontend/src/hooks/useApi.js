import { useCallback, useState } from "react";

export function useApi() {
  const [loading, setLoading] = useState(false);

  const runRequest = useCallback(async (task) => {
    try {
      setLoading(true);
      return await task();
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, runRequest };
}
