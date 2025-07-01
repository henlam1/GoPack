import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPackingListAPI,
  deletePackingListAPI,
  getPackingListAPI,
  updatePackingListAPI,
} from "../services/api/packingLists";

// TODO: Invalidate user onSuccess after each packing list CRUD mutation
export function usePackingListMutations(userId?: string, packingListId?: string) {
  const queryClient = useQueryClient();

  // CRUD Mutations
  const createPackingList = useMutation({ mutationFn: createPackingListAPI });
  const readPackingList = useMutation({ mutationFn: getPackingListAPI });
  const updatePackingList = useMutation({ mutationFn: updatePackingListAPI });
  const deletePackingList = useMutation({ mutationFn: deletePackingListAPI });

  return {
    createPackingList,
    readPackingList,
    updatePackingList,
    deletePackingList,
  };
}
