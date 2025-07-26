import ItemContainer from '../containers/ItemContainer';
import ICategory from '../models/CategoryModel';
import ItemForm from './forms/ItemForm';
import { useState } from 'react';
import { useCategoryMutations } from '../hooks/useCategoryMutations';
import {
  CategoryContextType,
  useCategory,
  useCategoryDispatch,
} from '../context/CategoryContext.js';

export default function Category({ _id, name, items, packingList }: ICategory) {
  console.log('Category: ', name, items, packingList);

  const categoryContext = useCategory();
  const dispatch = useCategoryDispatch();

  // State management
  const [category] = useState({
    name: name,
  });

  // Hooks to manage item CRUD
  const { deleteCategory } = useCategoryMutations(packingList, _id);

  function handleDelete() {
    deleteCategory.mutate(_id);
  }

  function handleEditClick(category: CategoryContextType) {
    dispatch('toggleEdit', category);
  }

  return (
    <div className="card card-border border-primary shadow-sm w-96">
      <div className="card-body">
        <div className="card-actions">
          {!categoryContext.editing && (
            <button
              className="btn btn-sm btn-error absolute inset-y-3 right-5"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
          {categoryContext.editing && (
            <button
              className="btn btn-sm btn-success absolute inset-y-3 right-5"
              onClick={() => handleEditClick(categoryContext)}
            >
              Save
            </button>
          )}
        </div>
        <h2 className="card-title text-3xl text-primary-content">
          {category.name}
        </h2>
        <ItemContainer itemIds={items as string[]} />
        <ItemForm categoryId={_id} />
      </div>
    </div>
  );
}
