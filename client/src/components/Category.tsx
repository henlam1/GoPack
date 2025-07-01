import ItemContainer from "../containers/ItemContainer";
import ICategory from "../models/CategoryModel";
import ItemForm from "./forms/ItemForm";
import { useState } from "react";
import { useCategoryMutations } from "../hooks/useCategoryMutations";

export default function Category({ _id, name, items, packingList }: ICategory) {
  console.log("Category: ", name, items, packingList);

  // State management
  const [category, setCategory] = useState({
    name: name,
  });

  // Hooks to manage item CRUD
  const { updateCategory, deleteCategory } = useCategoryMutations(packingList, _id);

  // State management handler functions
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });

    // Set a debounce save?
    handleEdit(name, value);
  }

  // Hook handler functions
  function handleEdit(name: string, newValue: string) {
    const update = { [name]: newValue };
    updateCategory.mutate({
      id: _id,
      update: update,
    });
  }

  function handleDelete() {
    deleteCategory.mutate(_id);
  }

  return (
    <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
      <input type="checkbox" />
      <div className="collapse-title font-semibold">{category.name}</div>
      <div className="collapse-content text-sm">
        <ItemContainer itemIds={items as string[]} />
        <h1>Item Form</h1>
        <ItemForm categoryId={_id} />
        <button
          className="btn btn-soft btn-secondary btn-sm"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
