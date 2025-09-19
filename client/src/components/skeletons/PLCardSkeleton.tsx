export default function PLCardSkeleton() {
  return (
    <div className="card bg-base-200 w-full shadow-sm animate-pulse">
      <div className="card-body flex flex-col">
        <div className="space-y-2 flex-grow">
          <div className="h-6 bg-base-300 rounded w-3/4"></div>
          <div className="h-4 bg-base-300 rounded w-1/2"></div>
          <div className="h-4 bg-base-300 rounded w-full"></div>
        </div>
        <div className="card-actions mt-auto justify-end">
          <div className="h-8 w-20 bg-base-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
