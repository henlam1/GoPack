import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createItemAPI,
  updateItemAPI,
  deleteItemAPI,
} from '../services/api/items';

export function useItemMutations(
  packingListId?: string,
  categoryId?: string,
  itemId?: string,
) {
  const queryClient = useQueryClient();

  // CRUD Mutations
  const createItem = useMutation({
    mutationFn: createItemAPI,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ['category', categoryId] }),
        queryClient.invalidateQueries({
          queryKey: ['packingList', packingListId],
        }),
      ]);
    },
  });

  const updateItem = useMutation({
    mutationFn: updateItemAPI,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ['item', itemId] }),
        queryClient.invalidateQueries({ queryKey: ['category', categoryId] }),
        queryClient.invalidateQueries({
          queryKey: ['packingList', packingListId],
        }),
      ]);
    },
  });

  const deleteItem = useMutation({
    mutationFn: deleteItemAPI,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ['category', categoryId] }),
        queryClient.invalidateQueries({
          queryKey: ['packingList', packingListId],
        }),
      ]);
    },
  });

  return { createItem, updateItem, deleteItem };
}
