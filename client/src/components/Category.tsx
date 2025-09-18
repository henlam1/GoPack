import ItemContainer from '../containers/ItemContainer';
import ICategory from '../models/CategoryModel';
import ItemForm from './forms/ItemForm';
import { useState } from 'react';
import { useCategoryMutations } from '../hooks/useCategoryMutations';

export default function Category({ _id, name, items, packingList }: ICategory) {
  console.log('Category: ', name, items, packingList);

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
