import { useState, useEffect } from 'react';

interface QueryStateWrapperProps {
  isFetching: boolean;
  isError: boolean;
  refetch?: () => void;
  isEmpty?: boolean;
  emptyMessage?: React.ReactNode;
  skeleton?: React.ReactNode;
  children: React.ReactNode;
}

export default function QueryStateWrapper({
  isFetching,
  isError,
  refetch,
  isEmpty,
  emptyMessage,
  skeleton,
  children,
}: QueryStateWrapperProps) {
  // TODO: Fix how we invalidate queries. Currently we fetch every time on page load
  /**
   * refetchOnMount: false,        // don't auto refetch just because it mounted
   * refetchOnWindowFocus: false,  // don't auto refetch when tab changes
   * refetchOnReconnect: false,    // don't refetch on network reconnect
   * keepPreviousData: true,       // keep cached data visible while refetching
   * cacheTime: 1000 * 60 * 60,    // keep data in cache for 1 hour (or longer)
   */
  const [showSkeleton, setShowSkeleton] = useState(isFetching && isEmpty);
  // Load skeleton for 500ms so it doesn't flash and ruin UX
  useEffect(() => {
    // Show skeleton if we're fetching without cached data
    if (isFetching && isEmpty) {
      setShowSkeleton(true);
      // We're not fetching or there's cached data, show the skeleton for 500ms
    } else {
      const timer = setTimeout(() => setShowSkeleton(false), 500); // 500ms min
      return () => clearTimeout(timer);
    }
  }, [isFetching, isEmpty]);

  if (showSkeleton) {
    return (
      <div className="max-w-6xl mx-auto px-4">
        {skeleton || <p>Loading...</p>}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-red-500 mb-4">Error loading data</p>
        {refetch && (
          <button className="btn btn-outline btn-error" onClick={refetch}>
            Retry
          </button>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
        {emptyMessage || (
          <>
            <p className="text-lg font-medium text-gray-500">No data found.</p>
          </>
        )}
      </div>
    );
  }

  return <>{children}</>;
}
