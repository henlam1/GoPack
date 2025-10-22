import { ReactNode, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import QueryStateWrapper from '../components/wrappers/QueryStateWrapper';
import { usePackingListActions } from '../hooks/usePackingListActions';
import { IPackingList } from '../models/PackingListModel';
import { getPackingListAPI } from '../services/api/packingLists';
import { PackingListContext } from './PackingListContext';
import { useParams } from 'react-router-dom';
import PLContainerSkeleton from '../components/feedback/skeletons/PLContainerSkeleton';

interface PackingListProviderProps {
  children: ReactNode;
}
export function PackingListProvider({ children }: PackingListProviderProps) {
  let { id } = useParams();
  id = id as string;
  const {
    data: packingList,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['packingList', id],
    queryFn: () => getPackingListAPI(id),
  });

  const emptyPackingList = {
    _id: '',
    name: '',
    categories: [],
    user: '',
    startDate: '',
    endDate: '',
    destination: '',
    description: '',
    packedItems: 0,
    totalItems: 0,
    status: '',
  };

  const [localPackingList, setPackingList] =
    useState<IPackingList>(emptyPackingList);
  const actions = usePackingListActions();

  useEffect(() => {
    if (packingList) {
      setPackingList(packingList);
    }
  }, [packingList]);

  return (
    <QueryStateWrapper
      isFetching={isFetching}
      isError={isError}
      refetch={refetch}
      isEmpty={!packingList || packingList.length === 0}
      skeleton={<PLContainerSkeleton />}
      emptyMessage={<p className="text-gray-500">Empty packing list.</p>}
    >
      <PackingListContext.Provider
        value={{
          packingList: localPackingList,
          setPackingList,
          actions,
        }}
      >
        {children}
      </PackingListContext.Provider>
    </QueryStateWrapper>
  );
}
