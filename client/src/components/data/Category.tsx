import ItemContainer from '../../containers/ItemContainer';
import ICategory from '../../models/CategoryModel';
import ItemForm from '../forms/ItemForm';
import { useState } from 'react';
import { useCategoryMutations } from '../../hooks/useCategoryMutations';
import Progress from '../feedback/Progress';

export default function Category({
  _id,
  name,
  items,
  packedItems,
  totalItems,
  packingList,
}: ICategory) {
  console.log('Category: ', name, items, packedItems, totalItems, packingList);

  // State management
  const [category] = useState({
    name: name,
  });

  // Hooks to manage item CRUD
  const { deleteCategory } = useCategoryMutations(packingList, _id);

  function handleDelete() {
    deleteCategory.mutate(_id);
  }

  return (
    <div
      key={_id}
      className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
    >
      {/* Hidden checkbox controls toggle */}
      <input type="checkbox" className="peer" />

      {/* Header */}
      <div className="collapse-title flex justify-between items-center">
        <span>{category.name}</span>
        {/* Progress bar placeholder */}
        <div className="flex-1 mr-2 w-1/2">
          <Progress value={(packedItems / totalItems) * 100} />
        </div>
      </div>

      {/* Content */}
      <div className="collapse-content">
        <ItemForm categoryId={_id}>
          <ItemContainer itemIds={items as string[]} />
        </ItemForm>
      </div>

      <button className="btn btn-sm btn-error" onClick={() => handleDelete()}>
        Delete Category
      </button>
    </div>
  );
}
