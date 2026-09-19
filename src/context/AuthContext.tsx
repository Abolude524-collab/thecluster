import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  signup: (name: string, email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('cluster_auth_user');
    return saved ? JSON.parse(saved) : { id: 'u_default', name: 'Testimony', email: 'creator@thecluster.app' };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('cluster_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cluster_auth_user');
    }
  }, [user]);

  const login = async (email: string) => {
    // Simulate auth network request
    await new Promise((res) => setTimeout(res, 500));
    setUser({
      id: 'u_' + Math.random().toString(36).substr(2, 6),
      name: email.split('@')[0] || 'Creator',
      email,
    });
  };

  const signup = async (name: string, email: string) => {
    await new Promise((res) => setTimeout(res, 500));
    setUser({
      id: 'u_' + Math.random().toString(36).substr(2, 6),
      name,
      email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
