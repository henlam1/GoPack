import IItem from "../models/ItemModel";

export default function Item({ packed, name, quantity }: IItem) {
  console.log("Item: ", packed, name, quantity);
  return (
    <>
      {packed}
      {name}
      {quantity}
    </>
  );
}
