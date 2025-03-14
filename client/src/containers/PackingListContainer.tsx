import { useQuery } from "@tanstack/react-query";
import { getItems } from "../services/api/items";
import IItem from "../models/ItemModel";

// CONTAINERS ARE RESPONSIBLE FOR MANAGING STATE AND PASSING DATA TO CHILD COMPONENTS
// PackingListContainer => Fetch packing lists => Render PackingListItem(props)
// This is used in the homepage to display cards of each packing list
export default function PackingListContainer() {
  const {
    data: items,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });
  return (
    <>
      {isPending && <div>Loading...</div>}
      {isError && <div>Error...</div>}
      {!isPending && (
        <ul>
          {items.map((item: IItem) => {
            return (
              <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
                <input type="checkbox" />
                <div className="collapse-title font-semibold">
                  How do I create an account?
                </div>
                <div className="collapse-content text-sm">
                  {item.packed}
                  {item.name}
                  {item.quantity}
                </div>
              </div>
            );
          })}
        </ul>
      )}
    </>
  );
}
