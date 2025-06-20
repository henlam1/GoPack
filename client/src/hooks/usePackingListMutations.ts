import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPackingListAPI,
  deletePackingListAPI,
  getPackingListAPI,
  updatePackingListAPI,
} from "../services/api/packingLists";

export function usePackingListMutations(packingListId: string) {
  const queryClient = useQueryClient();

  const invalidatePackingList = () => {
    queryClient.invalidateQueries({ queryKey: ["item", packingListId] });
  };

  // CRUD Mutations
  const createPackingList = useMutation({ mutationFn: createPackingListAPI });
  const readPackingList = useMutation({ mutationFn: getPackingListAPI });
  const updatePackingList = useMutation({ mutationFn: updatePackingListAPI });
  const deletePackingList = useMutation({ mutationFn: deletePackingListAPI });

  return {
    invalidatePackingList,
    createPackingList,
    readPackingList,
    updatePackingList,
    deletePackingList,
  };
}
