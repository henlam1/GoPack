import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createItemAPI,
  updateItemAPI,
  deleteItemAPI,
} from '../services/api/items';

export function useItemMutations(categoryId?: string, itemId?: string) {
  const queryClient = useQueryClient();

  // CRUD Mutations
  const createItem = useMutation({
    mutationFn: createItemAPI,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['category', categoryId],
      });
    },
  });

  const updateItem = useMutation({
    mutationFn: updateItemAPI,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['item', itemId],
      });
    },
  });

  const deleteItem = useMutation({
    mutationFn: deleteItemAPI,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['category', categoryId],
      });
    },
  });

  return { createItem, updateItem, deleteItem };
}
