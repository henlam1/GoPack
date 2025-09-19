import PackingListPageLayout from '../../components/layouts/PackingListPageLayout';
import PackingListContainer from '../../containers/PackingListContainer';
import { getActivePackingListsAPI } from '../../services/api/packingLists';

export default function HomePage() {
  return (
    <PackingListPageLayout title="Active Packing Lists">
      <PackingListContainer queryFn={getActivePackingListsAPI} />
    </PackingListPageLayout>
  );
}
