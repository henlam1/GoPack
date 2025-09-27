import { useQuery } from '@tanstack/react-query';
import CategoryContainerSkeleton from '../components/feedback/skeletons/CategoryContainerSkeleton';
import QueryStateWrapper from '../components/wrappers/QueryStateWrapper';
import { ICategory } from '../models/CategoryModel';
import CategoryCard from '../components/data/CategoryCard';
import { useCategoryActions } from '../hooks/useCategoryActions';
import { getPLCategoriesAPI } from '../services/api/packingLists';

interface CategoryContainerProps {
  packingListId: string;
}

export default function CategoryContainer({
  packingListId,
}: CategoryContainerProps) {
  const {
    data: categories,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['categories', packingListId],
    queryFn: () => getPLCategoriesAPI(packingListId),
  });
  console.log(categories);
  const actions = useCategoryActions(packingListId);

  return (
    <QueryStateWrapper
      isFetching={isFetching}
      isError={isError}
      refetch={refetch}
      isEmpty={!categories || categories.length === 0}
      skeleton={<CategoryContainerSkeleton />}
      emptyMessage={<p className="text-gray-500">No categories yet.</p>}
    >
      {categories?.map((category: ICategory) => {
        return (
          <CategoryCard
            key={category._id}
            {...category}
            onMarkAllPacked={actions.onMarkAllPacked(category._id, true)}
            onMarkAllUnpacked={actions.onMarkAllPacked(category._id, false)}
            onEdit={actions.onEdit}
            onDelete={actions.onDelete(category._id)}
          />
        );
      })}
    </QueryStateWrapper>
  );
}
