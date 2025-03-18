import { useQuery } from "@tanstack/react-query";
import PackingListCard from "../components/PackingListCard";
import { getPackingLists } from "../services/api/packingLists";
import IPackingList from "../models/PackingListModel";

// CONTAINERS ARE RESPONSIBLE FOR MANAGING STATE AND PASSING DATA TO CHILD COMPONENTS
// PackingListContainer => Fetch packing lists => Render PackingListItem(props)
// This is used in the homepage to display cards of each packing list

// This container might be an exception
// Populated categories/items will be lost here because we're redirecting to a details page
export default function PackingListContainer() {
  const {
    data: packingLists,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["packingList"],
    queryFn: getPackingLists, // Ideally getUserPackingLists or something
  });
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  console.log(packingLists);
  return (
    <ul>
      Some packing lists
      {packingLists.map((packingList: IPackingList) => {
        return <PackingListCard {...packingList}/>
      })}
    </ul>
  );
}
