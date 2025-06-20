import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCategoryAPI,
  deleteCategoryAPI,
  getCategoryAPI,
  updateCategoryAPI,
} from "../services/api/categories";

export function useCategoryMutations(packingListId: string) {
  const queryClient = useQueryClient();

  // CRUD Mutations
  const createCategory = useMutation({
    mutationFn: createCategoryAPI,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["packingList", packingListId],
      }),
  });
  const readCategory = useMutation({ mutationFn: getCategoryAPI });
  const updateCategory = useMutation({
    mutationFn: updateCategoryAPI,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["packingList", packingListId],
      }),
  });
  const deleteCategory = useMutation({
    mutationFn: deleteCategoryAPI,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["packingList", packingListId],
      }),
  });

  return {
    createCategory,
    readCategory,
    updateCategory,
    deleteCategory,
  };
}
