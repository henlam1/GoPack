import { useSortable } from '@dnd-kit/sortable';
import { ICategory } from '../../models/CategoryModel';
import CategoryCard from '../data/CategoryCard';
import { useCategory } from '../../hooks/useCategory';
import { CSS } from '@dnd-kit/utilities';

interface SortableCategoryCardProps {
  category: ICategory;
}

export default function SortableCategoryCard({
  category,
}: SortableCategoryCardProps) {
  const { actions } = useCategory();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: category._id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <CategoryCard
        key={category._id}
        {...category}
        onMarkAllPacked={actions.onMarkAllPacked(category._id, true)}
        onMarkAllUnpacked={actions.onMarkAllPacked(category._id, false)}
        onEdit={actions.onEdit(category._id)}
        onDelete={actions.onDelete(category._id)}
        dragHandleProps={listeners} // pass down drag handle props
      />
    </div>
  );
}
