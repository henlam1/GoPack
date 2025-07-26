import IItem from '../models/ItemModel';
import { useState } from 'react';
import { useItemMutations } from '../hooks/useItemMutations';
import {
  CategoryContextType,
  useCategory,
  useCategoryDispatch,
} from '../context/CategoryContext.js';

export default function Item({ _id, packed, name, quantity, category }: IItem) {
  const categoryContext = useCategory();
  const dispatch = useCategoryDispatch();

  // The old state is retained even after updates
  console.log('Item: ', name, quantity, packed, category);
  // State management
  const [item, setItem] = useState({
    name: name,
    packed: packed,
    quantity: quantity,
  });

  // Hooks to manage item CRUD
  const { updateItem, deleteItem } = useItemMutations(category, _id);

  // State management handler functions
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, type, value, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setItem({ ...item, [name]: newValue });

    // Set a debounce save?
    handleEdit(name, newValue);
  }

  // Hook handler functions
  function handleEdit(name: string, newValue: string | number | boolean) {
    const update = { [name]: newValue };
    updateItem.mutate({
      id: _id,
      update: update,
    });
  }
  function handleDelete() {
    deleteItem.mutate(_id);
  }

  function handleEditClick(category: CategoryContextType) {
    dispatch('toggleEdit', category);
  }

  return (
    <>
      {categoryContext.editing && (
        <>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={item.name}
            onChange={handleChange}
            className="input"
          />
          <input
            type="number"
            name="quantity"
            placeholder="#"
            value={item.quantity}
            onChange={handleChange}
            className="input"
          />
          <button
            className="btn btn-sm btn-error"
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        </>
      )}

      {!categoryContext.editing && (
        <>
          <span
            className="input input-ghost cursor-pointer"
            onClick={() => handleEditClick(categoryContext)}
          >
            {item.name}
          </span>
          <span
            onClick={() => handleEditClick(categoryContext)}
            className="input input-ghost cursor-pointer"
          >
            {item.quantity}
          </span>
          <input
            type="checkbox"
            name="packed"
            checked={item.packed}
            onChange={handleChange}
            className="checkbox [--size:2.5em]"
          />
        </>
      )}
    </>
  );
}
