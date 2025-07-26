import { ReactNode, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { hydrateAPI, logoutAPI } from '../services/api/users';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [shouldHydrate, setShouldHydrate] = useState(false);
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: hydrateAPI,
    enabled: shouldHydrate,
    staleTime: 60 * 5 * 1000, // 5 minutes
    retry: false,
  });

  async function logout() {
    await logoutAPI();
    queryClient.removeQueries({ queryKey: ['user'] });
    setShouldHydrate(false);
  }

  function setUser(newUser: string) {
    queryClient.setQueryData(['user'], newUser);
    setShouldHydrate(true);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
