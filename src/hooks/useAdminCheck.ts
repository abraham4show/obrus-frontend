import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export const useAdminCheck = () => {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    // Check if user has admin role from the user object
    const hasAdminRole = user.roles?.some((role: any) => role.role === 'admin') || false;
    setIsAdmin(hasAdminRole);
    setLoading(false);
  }, [user, authLoading]);

  return { isAdmin, loading: loading || authLoading, user };
};