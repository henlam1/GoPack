import PackingListPageLayout from '../../components/layouts/PackingListPageLayout';
import PackingListContainer from '../../containers/PackingListContainer';
import { getTrashedPackingListsAPI } from '../../services/api/packingLists';

export default function TrashPage() {
  return (
    <PackingListPageLayout title="Trashed Packing Lists">
      <PackingListContainer queryFn={getTrashedPackingListsAPI} />
    </PackingListPageLayout>
  );
}
