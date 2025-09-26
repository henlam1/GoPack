import { useQuery } from '@tanstack/react-query';
import PackingListCard from '../components/data/PackingListCard';
import { IPackingList } from '../models/PackingListModel';
import { usePackingListActions } from '../hooks/usePackingListActions';
import QueryStateWrapper from '../components/wrappers/QueryStateWrapper';
import { useState } from 'react';
import PLContainerSkeleton from '../components/feedback/skeletons/PLContainerSkeleton';

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
    queryKey: ['packingLists'],
    queryFn: queryFn,
  });
  console.log(packingLists);
  const actions = usePackingListActions();

  const [searchTerm, setSearchTerm] = useState('');
  const filteredPackingLists = packingLists?.filter((list) => {
    const term = searchTerm.toLowerCase();
    return (
      list.name.toLowerCase().includes(term) ||
      list.destination.toLowerCase().includes(term) ||
      list.description.toLowerCase().includes(term)
    );
  });

  return (
    <QueryStateWrapper
      isFetching={isFetching}
      isError={isError}
      refetch={refetch}
      isEmpty={!packingLists || packingLists.length === 0}
      skeleton={<PLContainerSkeleton />}
      emptyMessage={<p className="text-gray-500">No packing lists yet.</p>}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Search bar */}
        <div className="max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="Search packing lists..."
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        {/* Packing list grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredPackingLists?.map((packingList: IPackingList) => (
            <PackingListCard
              key={packingList._id}
              {...packingList}
              onEdit={actions.onEdit(packingList._id)}
              onSoftDelete={actions.onSoftDelete(packingList._id)}
              onHardDelete={actions.onHardDelete(packingList._id)}
              onRestore={actions.onRestore(packingList._id)}
              onArchive={actions.onArchive(packingList._id)}
            />
          ))}
        </div>
      </div>
    </QueryStateWrapper>
  );
}
