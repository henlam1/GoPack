import { createContext } from 'react';

interface AuthContextValue {
  user: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
  setUser: (newUser: string) => void;
}
export const AuthContext = createContext<AuthContextValue | null>(null);
