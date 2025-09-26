import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createPackingListAPI,
  updatePackingListAPI,
  deletePackingListAPI,
} from '../services/api/packingLists';

export function usePackingListMutations() {
  const queryClient = useQueryClient();

  // CRUD Mutations
  const createPackingList = useMutation({
    mutationFn: createPackingListAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['packingLists'],
      });
    },
  });

  const updatePackingList = useMutation({
    mutationFn: updatePackingListAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['packingLists'],
      });
    },
  });

  const deletePackingList = useMutation({
    mutationFn: deletePackingListAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['packingLists'],
      });
    },
  });

  return {
    createPackingList,
    updatePackingList,
    deletePackingList,
  };
}
