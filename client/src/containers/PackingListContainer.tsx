import { useQuery } from "@tanstack/react-query";
import PackingListCard from "../components/PackingListCard";
import { getPackingListsAPI } from "../services/api/packingLists";
import IPackingList from "../models/PackingListModel";
import PackingListForm from "../components/forms/PackingListForm";
import { genHexString } from "../utils/stringHelpers";


// CONTAINERS ARE RESPONSIBLE FOR MANAGING STATE AND PASSING DATA TO CHILD COMPONENTS
// PackingListContainer => Fetch packing lists => Render PackingListItem(props)
// This is used in the homepage to display cards of each packing list

export default function PackingListContainer() {
  // TODO: Fetch actual user ids
  const userId = genHexString(24);
  
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
    <div>
      <h2 className="text-5xl font-semibold tracking-tight sm:text-7xl mb-10">Packing Lists</h2>
      <PackingListForm userId={userId}/>
      <div className="flex flex-row gap-3 flex-wrap">
        {packingLists.map((packingList: IPackingList) => {
          return <PackingListCard {...packingList} />;
        })}
      </div>
    </div>
  );
}
