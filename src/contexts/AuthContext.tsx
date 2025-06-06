import { createContext, useContext, useEffect, useState } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem('isAuthenticated') === 'true',
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', String(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}
