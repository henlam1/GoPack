import IItem from "../models/ItemModel";
import Item from "../components/Item";
import { getItemAPI } from "../services/api/items";
import { useQueries } from "@tanstack/react-query";

// CONTAINERS ARE RESPONSIBLE FOR MANAGING STATE AND PASSING DATA TO CHILD COMPONENTS
// ItemContainer => Fetch Items => Render Item(props)
// This is used in the packing list page to display each item on the accordian dropdown

// TODO: Modify cached data on API calls.
// Currently, we're invalidating queries and refetching on API calls

interface ItemContainerProps {
  itemIds: string[];
}
export default function ItemContainer({ itemIds }: ItemContainerProps) {
  const itemQueries = itemIds.map((itemId) => ({
    queryKey: ["item", itemId],
    queryFn: () => getItemAPI(itemId),
  }));

  const results = useQueries({
    queries: itemQueries,
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  if (results.pending) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <p className="text-xl ml-2">Item</p>
        <p className="text-xl ml-2">Qty</p>
        <p className="text-xl">Actions</p>
        {results.data.length > 0 && results.data.map((item: IItem) => {
          return <Item {...item} />;
        })}
        {results.data.length == 0 && <div className="col-span-full mx-auto bg-accent text-accent-content">There are no items on this list yet!</div>}
      </div>
    </>
  );
}
