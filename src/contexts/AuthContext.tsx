import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/api/client'; // we'll create this file next

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

useEffect(() => {
  const fetchUser = async () => {
    try {
      const userData = await api.request('/auth/profile/');
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  fetchUser();
}, []);


  const signIn = async (email: string, password: string) => {
    const data = await api.login(email, password);
    setUser(data.user);
    return data.user;
  };

  const signUp = async (userData: any) => {
    const data = await api.register(userData);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
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