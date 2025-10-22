import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
  markAllPackedAPI,
} from '../services/api/categories';
import { ICategory } from '../models/CategoryModel';

export function useCategoryMutations(packingListId: string) {
  const queryClient = useQueryClient();

  // CRUD Mutations
  const createCategory = useMutation({
    mutationFn: createCategoryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories', packingListId],
      });
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, update }: { id: string; update: Partial<ICategory> }) =>
      updateCategoryAPI(id, update),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories', packingListId],
      });
    },
  });

  const deleteCategory = useMutation({
    mutationFn: deleteCategoryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories', packingListId],
      });
    },
  });

  const markAllPackedMutation = useMutation({
    mutationFn: ({ id, packed }: { id: string; packed: boolean }) =>
      markAllPackedAPI(id, packed),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ['categories', packingListId],
      });
      queryClient.invalidateQueries({
        queryKey: ['items', id],
      });
    },
  });

  const reorderItems = useMutation({
    mutationFn: ({ id, update }: { id: string; update: Partial<ICategory> }) =>
      updateCategoryAPI(id, update),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories', packingListId],
      });
    },
  });

  return {
    createCategory,
    updateCategory,
    deleteCategory,
    markAllPackedMutation,
    reorderItems,
  };
}
