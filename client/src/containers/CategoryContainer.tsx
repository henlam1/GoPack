import SortableCategories from '../components/sortable/SortableCategories';
import { CategoryProvider } from '../context/CategoryProvider';
import { usePackingList } from '../hooks/usePackingList';

export default function CategoryContainer() {
  const { packingList } = usePackingList();
  const packingListId = packingList._id;
  return (
    <CategoryProvider packingListId={packingListId}>
      <SortableCategories />
    </CategoryProvider>
  );
}
