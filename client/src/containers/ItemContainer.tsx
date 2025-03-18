import IItem from "../models/ItemModel";
import Item from "../components/Item";

// CONTAINERS ARE RESPONSIBLE FOR MANAGING STATE AND PASSING DATA TO CHILD COMPONENTS
// ItemContainer => Fetch Items => Render Item(props)
// This is used in the packing list page to display each item on the accordian dropdown

interface ItemContainerProps {
  items: IItem[];
}

export default function ItemContainer({ items }: ItemContainerProps) {
  console.log("ItemContainer: ", items);
  return (
    <div className="flex flex-col">
      {items.map((item: IItem) => {
        return <Item {...item} />;
      })}
    </div>
  );
}
