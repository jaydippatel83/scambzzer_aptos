import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { fetchCurrentUser, logoutUser } from "../lib/auth";
import type { UserData } from "../lib/auth";

export function useAuth() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Failed to fetch user");
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
    } catch (err: any) {
      setError(err.message || "Logout failed");
    }
  }, [router]);

  return { user, loading, error, logout };
}
