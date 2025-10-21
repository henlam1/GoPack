import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ICategory } from '../../models/CategoryModel';
import { useCategory } from '../../hooks/useCategory';
import SortableCategoryCard from './SortableCategoryCard';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';

export default function SortableCategories() {
  const { categories, setCategories } = useCategory();
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
      setCategories((prev) => {
        const oldIndex = prev.findIndex((c) => c._id === active.id);
        const newIndex = prev.findIndex((c) => c._id === over.id);
        if (oldIndex === -1 || newIndex === -1) return prev;

        return arrayMove(prev, oldIndex, newIndex);
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
        items={categories ? categories.map((cat) => cat._id) : []}
        strategy={verticalListSortingStrategy}
      >
        {categories?.map((category: ICategory) => {
          return <SortableCategoryCard category={category} />;
        })}
      </SortableContext>
    </DndContext>
  );
}
