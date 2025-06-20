import { useQuery } from "@tanstack/react-query";
import PackingListCard from "../components/PackingListCard";
import { getPackingListsAPI } from "../services/api/packingLists";
import IPackingList from "../models/PackingListModel";

// CONTAINERS ARE RESPONSIBLE FOR MANAGING STATE AND PASSING DATA TO CHILD COMPONENTS
// PackingListContainer => Fetch packing lists => Render PackingListItem(props)
// This is used in the homepage to display cards of each packing list

export default function PackingListContainer() {
  const {
    data: packingLists,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["packingLists"],
    queryFn: getPackingListsAPI, // Ideally getUserPackingLists or something
  });
  console.log(packingLists);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <ul>
      Some packing lists
      {packingLists.map((packingList: IPackingList) => {
        return <PackingListCard {...packingList} />;
      })}
    </ul>
  );
}
