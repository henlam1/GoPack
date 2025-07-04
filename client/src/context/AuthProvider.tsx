import { ReactNode } from "react";
import { useUser } from "../hooks/useUser";
import { AuthContext } from "./AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { logoutAPI } from "../services/api/users";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useUser();
  const queryClient = useQueryClient();

  function logout() {
    logoutAPI();
    queryClient.removeQueries({ queryKey: ["user"] });
  }

  function setUser(newUser: string) {
    queryClient.setQueryData(["user"], newUser);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
