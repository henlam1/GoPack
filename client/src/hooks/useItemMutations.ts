import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createItemAPI,
  updateItemAPI,
  deleteItemAPI,
} from '../services/api/items';
import IItem from '../models/ItemModel';

export function useItemMutations(packingListId?: string, categoryId?: string) {
  const queryClient = useQueryClient();

  // CRUD Mutations
  const createItem = useMutation({
    mutationFn: createItemAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items', categoryId] });
      queryClient.invalidateQueries({
        queryKey: ['categories', packingListId],
      });
    },
  });

  const updateItem = useMutation({
    mutationFn: ({ id, update }: { id: string; update: Partial<IItem> }) =>
      updateItemAPI(id, update),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items', categoryId] });
      queryClient.invalidateQueries({
        queryKey: ['categories', packingListId],
      });
    },
  });

  const deleteItem = useMutation({
    mutationFn: deleteItemAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories', packingListId],
      });
    },
  });

  return { createItem, updateItem, deleteItem };
}
