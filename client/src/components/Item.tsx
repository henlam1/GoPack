import IItem from "../models/ItemModel";
import { useState } from "react";
import { useItemMutations } from "../hooks/useItemMutations";

export default function Item({ _id, packed, name, quantity, category }: IItem) {
  // The old state is retained even after updates
  console.log("Item: ", name, quantity, packed, category);

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
    const newValue = type === "checkbox" ? checked : value;
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
    <tr>
      <th>
        <input
          type="checkbox"
          name="packed"
          checked={item.packed}
          onChange={handleChange}
          className="checkbox"
        />
      </th>
      <td>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={item.name}
          onChange={handleChange}
          className="input"
        />
      </td>
      <td>
        <input
          type="number"
          name="quantity"
          placeholder="#"
          value={item.quantity}
          onChange={handleChange}
          className="input"
        />
      </td>
      <td>
        <button
          className="btn btn-soft btn-secondary btn-sm"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
