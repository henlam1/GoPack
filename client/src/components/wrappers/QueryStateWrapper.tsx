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
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (!isFetching) {
      const timer = setTimeout(() => setShowSkeleton(false), 500); // 500ms min
      return () => clearTimeout(timer);
    }
  }, [isFetching]);

  if (isFetching && showSkeleton) {
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
            <img src="/empty-state.svg" alt="No data" className="w-40 mb-4" />
            <p className="text-lg font-medium text-gray-500">No data found.</p>
          </>
        )}
      </div>
    );
  }

  return <>{children}</>;
}
