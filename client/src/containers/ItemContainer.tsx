import IItem from '../models/ItemModel';
import Item from '../components/data/Item';
import { getCategoryItemsAPI } from '../services/api/categories';
import { useQuery } from '@tanstack/react-query';
import ItemContainerSkeleton from '../components/feedback/skeletons/ItemContainerSkeleton';
import QueryStateWrapper from '../components/wrappers/QueryStateWrapper';
import { useItemActions } from '../hooks/useItemActions';
import { useParams } from 'react-router-dom';

interface ItemContainerProps {
  categoryId: string;
}
export default function ItemContainer({ categoryId }: ItemContainerProps) {
  let { id } = useParams();
  id = id as string;

  const {
    data: items,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['items', categoryId],
    queryFn: () => getCategoryItemsAPI(categoryId),
  });
  console.log(items);
  const actions = useItemActions(id, categoryId);

  return (
    <QueryStateWrapper
      isFetching={isFetching}
      isError={isError}
      refetch={refetch}
      isEmpty={!items || items.length === 0}
      skeleton={<ItemContainerSkeleton />}
      emptyMessage={<p className="text-gray-500">No Items yet.</p>}
    >
      {items?.map((item: IItem) => (
        <Item
          key={item._id}
          {...item}
          onEdit={actions.onEdit}
          onDelete={actions.onDelete(item._id)}
        />
      ))}
    </QueryStateWrapper>
  );
}
