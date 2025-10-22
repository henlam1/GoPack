import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DragEndEvent,
  DndContext,
  closestCenter,
} from '@dnd-kit/core';
import {
  sortableKeyboardCoordinates,
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useCategoryActions } from '../../hooks/useCategoryActions';
import { useItem } from '../../hooks/useItem';
import { IItem } from '../../models/ItemModel';
import SortableItem from './SortableItem';
import { usePackingList } from '../../hooks/usePackingList';

export default function SortableItems() {
  const { packingList } = usePackingList();
  const { categoryId } = useItem();
  const { items, setItems } = useItem();
  const { onReorderItems } = useCategoryActions(packingList._id);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((c) => c._id === active.id);
        const newIndex = prev.findIndex((c) => c._id === over.id);
        if (oldIndex === -1 || newIndex === -1) return prev;
        const reordered = arrayMove(prev, oldIndex, newIndex);

        const newOrder = reordered.map((c) => c._id);
        onReorderItems(categoryId, newOrder)();
        return reordered;
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items ? items.map((item) => item._id) : []}
        strategy={verticalListSortingStrategy}
      >
        {items?.map((item: IItem) => {
          return <SortableItem key={item._id} item={item} />;
        })}
      </SortableContext>
    </DndContext>
  );
}
