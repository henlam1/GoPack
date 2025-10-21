import SortableCategories from '../components/sortable/SortableCategories';
import { CategoryProvider } from '../context/CategoryProvider';

interface CategoryContainerProps {
  packingListId: string;
}

export default function CategoryContainer({
  packingListId,
}: CategoryContainerProps) {
  return (
    <CategoryProvider packingListId={packingListId}>
      <SortableCategories />
    </CategoryProvider>
  );
}
