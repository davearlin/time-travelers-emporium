import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  initializing: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  // Rehydrate auth state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('timeTravel_user');
      if (saved) {
        const parsed = JSON.parse(saved) as User | null;
        if (parsed && parsed.isAuthenticated) {
          setUser(parsed);
        }
      }
    } catch {
      // ignore parse errors
    }
  setInitializing(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    // Hardcoded credentials
    if (username === 'launchuser' && password === 'password') {
      const nextUser: User = { username, isAuthenticated: true };
      setUser(nextUser);
      try {
        localStorage.setItem('timeTravel_user', JSON.stringify(nextUser));
      } catch {
        // ignore storage errors
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('timeTravel_user');
    } catch {
      // ignore storage errors
    }
  };

  return (
  <AuthContext.Provider value={{ user, initializing, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
