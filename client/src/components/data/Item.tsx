import IItem from '../../models/ItemModel';
import { useState } from 'react';
import { useItemMutations } from '../../hooks/useItemMutations';

export default function Item({ _id, packed, name, quantity, category }: IItem) {
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

  return (
    <tr key={_id}>
      <td>
        <input
          name="packed"
          type="checkbox"
          className="checkbox checkbox-primary"
          checked={item.packed}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          name="name"
          type="text"
          className={
            item.packed
              ? 'line-through text-gray-400 input input-bordered w-full'
              : 'input input-bordered w-full'
          }
          value={item.name}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          name="quantity"
          type="text"
          className="input input-bordered w-full"
          value={item.quantity}
          onChange={handleChange}
        />
      </td>
      <td>
        <button className="btn btn-sm btn-error" onClick={() => handleDelete()}>
          Delete
        </button>
      </td>
    </tr>
  );
}
