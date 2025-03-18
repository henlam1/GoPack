import IItem from "../models/ItemModel";

// TODO: ADD EDITS (TOGGLE PACKED, CHANGE NAME/QUANTITY)
export default function Item({ packed, name, quantity }: IItem) {
  console.log("Item: ", packed, name, quantity);
  return (
    <div>
      {packed}
      {name}
      {quantity}
    </div>
  );
}
