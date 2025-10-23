import { useSortable } from '@dnd-kit/sortable';
import { useItem } from '../../hooks/useItem';
import { IItem } from '../../models/ItemModel';
import Item from '../data/Item';
import { CSS } from '@dnd-kit/utilities';

interface SortableCategoryCardProps {
  item: IItem;
}

export default function SortableItem({ item }: SortableCategoryCardProps) {
  const { actions } = useItem();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item._id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Item
        key={item._id}
        {...item}
        onEdit={actions.onEdit}
        onDelete={actions.onDelete(item._id)}
        dragHandleProps={listeners}
      />
    </div>
  );
}
