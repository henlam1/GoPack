import { useQuery } from "@tanstack/react-query";
import IItem from "../models/ItemModel";
import { getItems } from "../services/api/items";

export default function PackingListContainer() {
  // TODO: Decide what containers we need
  // e.g. containers for showing packing lists,
  // accordian for categories
  // container for grouping items

  // TODO: DRY Principle
  // Current rendering is egregious and nested
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
