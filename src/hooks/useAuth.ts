import { useState, useEffect, useCallback } from "react";
import { fetchCurrentUser, logoutUser } from "../lib/auth";
import type { UserData } from "../lib/auth";

export function useAuth() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadUser() {
      setLoading(true);
      try {
        const data = await fetchCurrentUser();
        if (isMounted) {
          setUser(data);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to fetch user");
          setUser(null);
        }
      }
    }
    loadUser();
    return () => {
      isMounted = false;
    };
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Logout failed");
    }
  }, []);

  return { user, loading, error, logout };
}
