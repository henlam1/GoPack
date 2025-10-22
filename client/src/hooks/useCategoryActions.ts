import { useCategoryMutations } from './useCategoryMutations';
import { ICategory } from '../models/CategoryModel';

export function useCategoryActions(packingListId: string) {
  const {
    updateCategory,
    deleteCategory,
    markAllPackedMutation,
    reorderItems,
  } = useCategoryMutations(packingListId);

  return {
    onEdit: (id: string) => (update: Partial<ICategory>) =>
      updateCategory.mutate({ id, update }),
    onDelete: (id: string) => () => deleteCategory.mutate(id),
    onMarkAllPacked: (id: string, packed: boolean) => () =>
      markAllPackedMutation.mutate({ id, packed }),
    onReorderItems: (id: string, newOrder: string[]) => () =>
      reorderItems.mutate({ id, update: { items: newOrder } }),
  };
}
