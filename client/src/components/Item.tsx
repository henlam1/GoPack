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
        <span className="flex gap-1">
          <button className="btn btn-square btn-error text-xl" onClick={() => handleDelete()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-[1.2em]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="6"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button className="btn btn-square btn-neutral" onClick={(toggleEditing)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="size-[2em]"
            stroke="currentColor">
            <path
              d="M13.775,18.707,8.482,13.414a2,2,0,0,1,0-2.828l5.293-5.293,1.414,1.414L9.9,12l5.293,5.293Z"     
            />
          </svg>

          </button>
        </span>
      </>
      )}

      { !editing && (
      <>
        <span className="input input-ghost cursor-pointer" onClick={handleClick}>{item.name}</span>
        <span onClick={handleClick} className="input input-ghost cursor-pointer">{item.quantity}</span>
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
