import PackingListPageLayout from '../../components/layouts/PackingListPageLayout';
import PackingListContainer from '../../containers/PackingListContainer';
import { getCompletedPackingListsAPI } from '../../services/api/packingLists';

export default function CompletedPage() {
  return (
    <PackingListPageLayout title="Completed Packing Lists">
      <PackingListContainer queryFn={getCompletedPackingListsAPI} />
    </PackingListPageLayout>
  );
}
