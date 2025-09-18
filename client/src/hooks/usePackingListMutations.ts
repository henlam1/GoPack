import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createPackingListAPI,
  updatePackingListAPI,
  deletePackingListAPI,
} from '../services/api/packingLists';

export function usePackingListMutations(packingListId?: string) {
  const queryClient = useQueryClient();

  // CRUD Mutations
  const createPackingList = useMutation({
    mutationFn: createPackingListAPI,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['packingLists'],
      });
    },
  });

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
        queryKey: ['packingList'],
      });
    },
  });

  return {
    createPackingList,
    updatePackingList,
    deletePackingList,
  };
}
