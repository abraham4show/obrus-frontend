import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '@/api/client';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  username?: string;
  roles?: { id: number; role: string; created_at: string }[];
  is_staff?: boolean;
  is_superuser?: boolean;
  is_staff_member?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (userData: any) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to fetch current user profile
  const fetchUser = async () => {
    try {
      const userData = await api.request('/auth/profile/');
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Failed to fetch user', error);
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // On app load and after OAuth redirect, fetch user
  useEffect(() => {
    // Check if we just returned from Google OAuth (the URL may contain code or state params)
    const urlParams = new URLSearchParams(window.location.search);
    const hasOAuthParams = urlParams.has('code') || urlParams.has('state');
    
    if (hasOAuthParams) {
      // Clean the URL without the OAuth parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Fetch user – this will succeed if session cookie is present (normal login or OAuth)
    fetchUser().then((loggedIn) => {
      if (loggedIn && (location.pathname === '/login' || location.pathname === '/signup')) {
        // If already logged in and on login/signup page, redirect to dashboard
        navigate('/dashboard', { replace: true });
      } else if (!loggedIn && location.pathname !== '/login' && location.pathname !== '/signup') {
        // Not logged in and not on public pages, redirect to login
        navigate('/login', { replace: true });
      }
    });
  }, []); // Run only once on mount

  const signIn = async (email: string, password: string) => {
    const data = await api.login(email, password);
    setUser(data.user);
    navigate('/dashboard', { replace: true });
    return data.user;
  };

  const signUp = async (userData: any) => {
    const data = await api.register(userData);
    setUser(data.user);
    navigate('/dashboard', { replace: true });
    return data.user;
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};