import { useNavigate } from 'react-router-dom';
import privateRoutes from '../routes/privateRoutes';
import { usePackingListMutations } from './usePackingListMutations';

export function usePackingListActions() {
  const navigate = useNavigate();
  const { updatePackingList, deletePackingList, reorderCategories } =
    usePackingListMutations();

  return {
    onEdit: (id: string) => () => navigate(privateRoutes.packingLists.edit(id)),
    onSoftDelete: (id: string) => () =>
      updatePackingList.mutate({ id, update: { status: 'trashed' } }),
    onHardDelete: (id: string) => () => deletePackingList.mutate(id),
    onRestore: (id: string) => () =>
      updatePackingList.mutate({ id, update: { status: 'active' } }),
    onArchive: (id: string) => () =>
      updatePackingList.mutate({ id, update: { status: 'archived' } }),
    onReorderCategories: (id: string, newOrder: string[]) => () =>
      reorderCategories.mutate({ id, update: { categories: newOrder } }),
  };
}
