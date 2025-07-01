import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCategoryAPI,
  deleteCategoryAPI,
  getCategoryAPI,
  updateCategoryAPI,
} from "../services/api/categories";

export function useCategoryMutations(
  packingListId?: string,
  categoryId?: string
) {
  const queryClient = useQueryClient();

  // CRUD Mutations
  const createCategory = useMutation({
    mutationFn: createCategoryAPI,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["packingList", packingListId],
      });
    },
  });
  const readCategory = useMutation({ mutationFn: getCategoryAPI });
  const updateCategory = useMutation({
    mutationFn: updateCategoryAPI,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["category", categoryId],
      });
    },
  });
  const deleteCategory = useMutation({
    mutationFn: deleteCategoryAPI,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["packingList", packingListId],
      });
    },
  });

  return {
    createCategory,
    readCategory,
    updateCategory,
    deleteCategory,
  };
}
