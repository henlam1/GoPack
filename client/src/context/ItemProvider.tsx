import { ReactNode, useEffect, useState } from 'react';
import { ItemContext } from './ItemContext';
import { useQuery } from '@tanstack/react-query';
import { useItemActions } from '../hooks/useItemActions';
import { IItem } from '../models/ItemModel';
import ItemContainerSkeleton from '../components/feedback/skeletons/ItemContainerSkeleton';
import QueryStateWrapper from '../components/wrappers/QueryStateWrapper';
import { getCategoryItemsAPI } from '../services/api/categories';
import { usePackingList } from '../hooks/usePackingList';

interface ItemProviderProps {
  categoryId: string;
  children: ReactNode;
}
export function ItemProvider({ categoryId, children }: ItemProviderProps) {
  const {
    data: items,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['items', categoryId],
    queryFn: () => getCategoryItemsAPI(categoryId),
  });

  const [localItems, setItems] = useState<IItem[]>([]);
  const { packingList } = usePackingList();
  const actions = useItemActions(packingList._id, categoryId);

  useEffect(() => {
    if (items) {
      setItems(items);
    }
  }, [items]);

  return (
    <QueryStateWrapper
      isFetching={isFetching}
      isError={isError}
      refetch={refetch}
      isEmpty={!items || items.length === 0}
      skeleton={<ItemContainerSkeleton />}
      emptyMessage={<p className="text-gray-500">No items yet.</p>}
    >
      <ItemContext.Provider
        value={{
          items: localItems,
          setItems,
          actions,
          categoryId,
        }}
      >
        {children}
      </ItemContext.Provider>
    </QueryStateWrapper>
  );
}
