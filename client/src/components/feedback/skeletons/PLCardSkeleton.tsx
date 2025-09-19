export default function PLCardSkeleton() {
  return (
    <div className="card bg-base-200 w-full shadow-sm animate-pulse">
      <div className="card-body flex flex-col">
        {/* Card info */}
        <div className="card-info space-y-2 flex-grow">
          {/* Title */}
          <div className="card-title h-6 bg-base-300 rounded w-3/4"></div>

          {/* Meta info (dates + destination) */}
          <div className="space-y-1">
            <div className="h-4 bg-base-300 rounded w-1/2"></div>
            <div className="h-4 bg-base-300 rounded w-1/3"></div>
          </div>

          {/* Description */}
          <div className="h-4 bg-base-300 rounded w-full"></div>
        </div>

        {/* Actions row (progress bar + ellipsis) */}
        <div className="card-actions mt-auto justify-end pt-4 border-t border-gray-300/30 flex items-center">
          {/* Progress bar placeholder */}
          <div className="h-3 bg-base-300 rounded flex-1 mr-2 w-1/2"></div>

          {/* Ellipsis menu placeholder */}
          <div className="h-8 w-8 bg-base-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
