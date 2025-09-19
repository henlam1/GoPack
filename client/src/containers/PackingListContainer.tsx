import { useQuery } from '@tanstack/react-query';
import PackingListCard from '../components/PackingListCard';
import IPackingList from '../models/PackingListModel';
import PLCardSkeleton from '../components/skeletons/PLCardSkeleton';
import { usePackingListActions } from '../hooks/usePackingListActions';

// CONTAINERS ARE RESPONSIBLE FOR MANAGING STATE AND PASSING DATA TO CHILD COMPONENTS
// PackingListContainer => Fetch packing lists => Render PackingListItem(props)
// This is used in the homepage to display cards of each packing list

interface PackingListContainerProps {
  queryFn: () => Promise<IPackingList[]>;
}
export default function PackingListContainer({
  queryFn,
}: PackingListContainerProps) {
  const {
    data: packingLists,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['packingList'],
    queryFn: queryFn, // Ideally getUserPackingLists or something
  });
  console.log(packingLists);
  const actions = usePackingListActions();

  if (isPending) {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <PLCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center py-10">
          <p className="text-red-500 mb-4">Error Loading Packing Lists</p>
          <button
            className="btn btn-outline btn-error"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {packingLists.map((packingList: IPackingList) => (
          <PackingListCard
            key={packingList._id}
            {...packingList}
            onEdit={actions.onEdit(packingList._id)}
            onSoftDelete={actions.onSoftDelete(packingList._id)}
            onHardDelete={actions.onHardDelete(packingList._id)}
            onRestore={actions.onRestore(packingList._id)}
            onComplete={actions.onComplete(packingList._id)}
          />
        ))}
      </div>
    </div>
  );
}
