import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCategoryAPI,
  deleteCategoryAPI,
  getCategoryAPI,
  updateCategoryAPI,
} from "../services/api/categories";

export function useCategoryMutations(categoryId: string) {
  const queryClient = useQueryClient();

  const invalidateCategory = () => {
    queryClient.invalidateQueries({ queryKey: ["item", categoryId] });
  };

  // CRUD Mutations
  const createCategory = useMutation({ mutationFn: createCategoryAPI });
  const readCategory = useMutation({ mutationFn: getCategoryAPI });
  const updateCategory = useMutation({ mutationFn: updateCategoryAPI });
  const deleteCategory = useMutation({ mutationFn: deleteCategoryAPI });

  return {
    invalidateCategory,
    createCategory,
    readCategory,
    updateCategory,
    deleteCategory,
  };
}
