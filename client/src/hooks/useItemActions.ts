import IItem from '../models/ItemModel';
import { useItemMutations } from './useItemMutations';

export function useItemActions(packingListId: string, categoryId: string) {
  const { createItem, updateItem, deleteItem } = useItemMutations(
    packingListId,
    categoryId,
  );

  return {
    onCreate: (item: Omit<IItem, '_id'>) => () => createItem.mutate(item),
    onEdit: (id: string, update: Partial<IItem>) => () =>
      updateItem.mutate({ id, update }),
    onDelete: (id: string) => () => deleteItem.mutate(id),
  };
}
