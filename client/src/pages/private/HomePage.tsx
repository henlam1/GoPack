import PackingListContainer from '../../containers/PackingListContainer';
import { getActivePackingListsAPI } from '../../services/api/packingLists';

export default function HomePage() {
  return (
    <div className="m-4">
      <h2 className="text-5xl font-semibold tracking-tight sm:text-7xl mb-10">
        Active Packing Lists
      </h2>
      <PackingListContainer queryFn={getActivePackingListsAPI} />
    </div>
  );
}
