import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createPackingListAPI,
  deletePackingListAPI,
  getPackingListAPI,
  updatePackingListAPI,
} from '../services/api/packingLists';

export function usePackingListMutations(
  userId?: string,
  packingListId?: string,
) {
  const queryClient = useQueryClient();

  // CRUD Mutations
  const createPackingList = useMutation({
    mutationFn: createPackingListAPI,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['user', userId],
      });
    },
  });
  const readPackingList = useMutation({ mutationFn: getPackingListAPI });
  const updatePackingList = useMutation({
    mutationFn: updatePackingListAPI,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['packingList', packingListId],
      });
    },
  });
  const deletePackingList = useMutation({
    mutationFn: deletePackingListAPI,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['user', userId],
      });
    },
  });

  return {
    createPackingList,
    readPackingList,
    updatePackingList,
    deletePackingList,
  };
}
