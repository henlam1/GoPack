import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { hydrateAPI, logoutAPI } from '../services/api/users';

type HydrationStatus = 'idle' | 'hydrating' | 'complete' | 'disabled';

export function AuthProvider({ children }: { children: ReactNode }) {
  /** Check if we're on a public page */
  const URL = window.location.pathname;
  const isPublicPage = ['/', '/login', '/register'].includes(URL);

  /** Hydration status */
  const [shouldHydrate, setShouldHydrate] = useState(false);
  const [hydrationStatus, setHydrationStatus] =
    useState<HydrationStatus>('idle');

  /** Hydration query */
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: hydrateAPI,
    enabled: shouldHydrate,
    staleTime: 60 * 5 * 1000, // 5 minutes
    retry: false,
  });

  /** Track if user is logged out */
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  /** Logout the user */
  async function logout() {
    await logoutAPI();
    queryClient.removeQueries({ queryKey: ['user'] });
    setShouldHydrate(false);
    setHydrationStatus('disabled');
    setHasLoggedOut(true);
  }

  /** Login the user */
  function setUser(newUser: string) {
    queryClient.setQueryData(['user'], newUser);
    setShouldHydrate(true);
    setHydrationStatus('complete');
    setHasLoggedOut(false);
  }

  /** Manage hydration status */
  useEffect(() => {
    if (isLoading) {
      setHydrationStatus('hydrating');
    } else if (isSuccess) {
      setHydrationStatus('complete');
    } else if (isError) {
      setHydrationStatus('disabled');
    }
  }, [isLoading, isSuccess, isError]);

  /** Dynamically enable hydration for private pages */
  useEffect(() => {
    if (!isPublicPage && !hasLoggedOut) {
      setShouldHydrate(true);
    }
  }, [isPublicPage, hasLoggedOut]);

  return (
    <AuthContext.Provider
      value={{
        user,
        hydrationStatus,
        isAuthenticated: !!user,
        isLoading,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
