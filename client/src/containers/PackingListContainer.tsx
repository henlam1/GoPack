import { useQuery } from '@tanstack/react-query';
import PackingListCard from '../components/data/PackingListCard';
import IPackingList from '../models/PackingListModel';
import { usePackingListActions } from '../hooks/usePackingListActions';
import QueryStateWrapper from '../components/wrappers/QueryStateWrapper';
import PLCardSkeletonGrid from '../components/feedback/skeletons/PLCardSkeletonGrid';

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
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['packingList'],
    queryFn: queryFn,
  });
  console.log(packingLists);
  const actions = usePackingListActions();

  return (
    <QueryStateWrapper
      isFetching={isFetching}
      isError={isError}
      refetch={refetch}
      isEmpty={!packingLists || packingLists.length === 0}
      skeleton={<PLCardSkeletonGrid />}
      emptyMessage={<p className="text-gray-500">No packing lists yet.</p>}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {packingLists?.map((packingList: IPackingList) => (
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
    </QueryStateWrapper>
  );
}
