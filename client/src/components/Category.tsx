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
    <div className="card card-border border-primary shadow-sm w-96">
      <div className="card-body">
        <h2 className="card-title text-3xl text-primary-content">
          {category.name}
        </h2>
        <ItemContainer itemIds={items as string[]} />
        <ItemForm categoryId={_id} />
      </div>
      <button className="btn btn-sm btn-error" onClick={() => handleDelete()}>
        Delete
      </button>
    </div>
  );
}
