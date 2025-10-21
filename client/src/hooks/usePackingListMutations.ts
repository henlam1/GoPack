import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createPackingListAPI,
  updatePackingListAPI,
  deletePackingListAPI,
} from '../services/api/packingLists';
import { useParams } from 'react-router-dom';

export function usePackingListMutations() {
  const { id } = useParams();
  const packingListId = id as string;
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

  const reorderCategories = useMutation({
    mutationFn: updatePackingListAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['packingList', packingListId],
      });
      queryClient.invalidateQueries({
        queryKey: ['categories', packingListId],
      });
    },
  });

  return {
    createPackingList,
    updatePackingList,
    deletePackingList,
    reorderCategories,
  };
}
