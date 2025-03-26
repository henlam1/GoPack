import { useMutation, useQueryClient } from "@tanstack/react-query";
import IItem from "../models/ItemModel";
import { deleteItem } from "../services/api/items";

// TODO: ADD EDITS (TOGGLE PACKED, CHANGE NAME/QUANTITY)
export default function Item({ _id, packed, name, quantity, category }: IItem) {
  console.log("Item: ", packed, name, quantity, category);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["category", category] });
    },
  });

  function handleDelete() {
    mutate(_id);
  }

  return (
    <div>
      {packed}
      {name}
      {quantity}
      <button
          className="btn btn-soft btn-secondary btn-sm"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
    </div>
  );
}
