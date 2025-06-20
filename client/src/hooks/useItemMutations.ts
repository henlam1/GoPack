import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createItemAPI,
  getItemAPI,
  updateItemAPI,
  deleteItemAPI,
} from "../services/api/items";
import { useCategoryMutations } from "./useCategoryMutations";

export function useItemMutations(categoryId: string, itemId?: string) {
  const queryClient = useQueryClient();
  
  // Invalidate function for category/item re-fetches
  const invalidateCategory = useCategoryMutations(categoryId);
  const invalidateItem = () => {
    queryClient.invalidateQueries({ queryKey: ["item", itemId] });
  };

  // CRUD Mutations
  const createItem = useMutation({
    mutationFn: createItemAPI,
    onSuccess: () => invalidateCategory,
  });
  const readItem = useMutation({
    mutationFn: getItemAPI,
  });
  const updateItem = useMutation({
    mutationFn: updateItemAPI,
    onSuccess: () => invalidateCategory,
  });
  const deleteItem = useMutation({
    mutationFn: deleteItemAPI,
    onSuccess: () => invalidateCategory,
  });

  return { invalidateItem, createItem, readItem, updateItem, deleteItem };
}
