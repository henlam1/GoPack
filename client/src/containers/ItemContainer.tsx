import SortableItems from '../components/sortable/SortableItems';
import { ItemProvider } from '../context/ItemProvider';

interface ItemContainerProps {
  categoryId: string;
}
export default function ItemContainer({ categoryId }: ItemContainerProps) {
  return (
    <ItemProvider categoryId={categoryId}>
      <SortableItems />
    </ItemProvider>
  );
}
