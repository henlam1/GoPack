import PackingListPageLayout from '../../components/layouts/PackingListPageLayout';
import PackingListContainer from '../../containers/PackingListContainer';
import { getArchivedPackingListsAPI } from '../../services/api/packingLists';

export default function ArchivedPage() {
  return (
    <PackingListPageLayout title="Archived Packing Lists">
      <PackingListContainer queryFn={getArchivedPackingListsAPI} />
    </PackingListPageLayout>
  );
}
