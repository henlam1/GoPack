import IItem from "../models/ItemModel";
import { useState } from "react";
import { useItemMutations } from "../hooks/useItemMutations";

export default function Item({ _id, packed, name, quantity, category}: IItem) {
  // The old state is retained even after updates
  console.log("Item: ", name, quantity, packed, category);
  // State management
  const [item, setItem] = useState({
    name: name,
    packed: packed,
    quantity: quantity
  });
  const [editing, setEditing] = useState(false);

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
  function handleClick() {
    toggleEditing();
  }
  function toggleEditing(){
    setEditing(editing => !editing);
  }

  return (
    <>
      { editing && (
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={item.name}
        onChange={handleChange}
        className="input"
      />
      )}

      { !editing && (
      <span className="input input-ghost cursor-pointer" onClick={handleClick}>{item.name}</span>
      )}
      
      { editing && (
      <input
        type="number"
        name="quantity"
        placeholder="#"
        value={item.quantity}
        onChange={handleChange}
        className="input"
      />
      )}

      { !editing && (
      <span onClick={handleClick} className="input input-ghost cursor-pointer">{item.quantity}</span>
      )}

      { !editing && (
        <input
        type="checkbox"
        name="packed"
        checked={item.packed}
        onChange={handleChange}
        className="checkbox [--size:2.5em]"
      />
      )}

      { editing && (
        <span className="flex gap-1">
        <button className="btn btn-square btn-error text-xl" onClick={() => handleDelete()}>
          X
        </button>
      <button className="btn btn-square btn-neutral" onClick={(toggleEditing)}>
        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 404.43"><path fill-rule="nonzero" d="m68.69 184.48 443.31.55v34.98l-438.96-.54 173.67 159.15-23.6 25.79L0 199.94 218.6.02l23.6 25.79z"/></svg>      
      </button>
      </span>
      )}
    </>
  );
}
