import { ReactNode, useEffect, useState } from 'react';
import { CategoryContext } from './CategoryContext';
import { useQuery } from '@tanstack/react-query';
import { getPLCategoriesAPI } from '../services/api/packingLists';
import { useCategoryActions } from '../hooks/useCategoryActions';
import { ICategory } from '../models/CategoryModel';
import CategoryContainerSkeleton from '../components/feedback/skeletons/CategoryContainerSkeleton';
import QueryStateWrapper from '../components/wrappers/QueryStateWrapper';

interface CategoryProviderProps {
  packingListId: string;
  children: ReactNode;
}
export function CategoryProvider({
  packingListId,
  children,
}: CategoryProviderProps) {
  const {
    data: categories,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['categories', packingListId],
    queryFn: () => getPLCategoriesAPI(packingListId),
  });

  const [localCategories, setCategories] = useState<ICategory[]>([]);
  const actions = useCategoryActions(packingListId);

  useEffect(() => {
    if (categories) {
      setCategories(categories);
    }
  }, [categories]);

  return (
    <QueryStateWrapper
      isFetching={isFetching}
      isError={isError}
      refetch={refetch}
      isEmpty={!categories || categories.length === 0}
      skeleton={<CategoryContainerSkeleton />}
      emptyMessage={<p className="text-gray-500">No categories yet.</p>}
    >
      <CategoryContext.Provider
        value={{
          categories: localCategories,
          setCategories,
          actions,
        }}
      >
        {children}
      </CategoryContext.Provider>
    </QueryStateWrapper>
  );
}
