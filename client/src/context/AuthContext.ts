import { createContext } from "react";

interface AuthContextValue {
  user: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  setUser: (newUser: string) => void;
}
export const AuthContext = createContext<AuthContextValue | null>(null);
