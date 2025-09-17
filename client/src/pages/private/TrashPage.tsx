import PackingListContainer from '../../containers/PackingListContainer';
import { getTrashedPackingListsAPI } from '../../services/api/packingLists';

export default function TrashPage() {
  return (
    <div className="m-4">
      <h2 className="text-5xl font-semibold tracking-tight sm:text-7xl mb-10">
        Trashed Packing Lists
      </h2>
      <PackingListContainer queryFn={getTrashedPackingListsAPI} />
    </div>
  );
}
