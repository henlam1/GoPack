import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createItemAPI,
  getItemAPI,
  updateItemAPI,
  deleteItemAPI,
} from "../services/api/items";

export function useItemMutations(categoryId: string) {
  const queryClient = useQueryClient();

  // CRUD Mutations
  const createItem = useMutation({
    mutationFn: createItemAPI,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["category", categoryId] }),
  });
  const readItem = useMutation({
    mutationFn: getItemAPI,
  });
  const updateItem = useMutation({
    mutationFn: updateItemAPI,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["category", categoryId] }),
  });
  const deleteItem = useMutation({
    mutationFn: deleteItemAPI,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["category", categoryId] }),
  });

  return { createItem, readItem, updateItem, deleteItem };
}
