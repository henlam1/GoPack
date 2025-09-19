import PLCardSkeleton from './PLCardSkeleton';

export default function PLCardSkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <PLCardSkeleton key={i} />
      ))}
    </div>
  );
}
