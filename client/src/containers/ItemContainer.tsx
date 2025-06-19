import IItem from "../models/ItemModel";
import Item from "../components/Item";
import { getItem } from "../services/api/items";
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
    queryFn: () => getItem(itemId),
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
    <ul className="list bg-base-100 rounded-box shadow-md">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Packed</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.data.map((item: IItem) => {
              return <Item {...item} />;
            })}
          </tbody>
        </table>
      </div>
    </ul>
  );
}
