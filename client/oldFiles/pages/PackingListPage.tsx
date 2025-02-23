import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PackingList from "../features/packingList/PackingList";
import { PackingListType } from "../interfaces/PackingList";
import { getPackingList } from "../services/packingList";

export default function PackingListPage() {
  const { id } = useParams();
  const emptyPackingList = {
    name: "placeholder",
    duration: 1,
    categories: [],
  };
  const [packingList, setPackingList] =
    useState<PackingListType>(emptyPackingList);

  console.log(id);
  console.log(packingList);

  // This method fetches the packing list of this id from the database.
  useEffect(() => {
    async function getList() {
      if (id) {
        const response = await getPackingList(id);
        const packingList = await response?.json();
        setPackingList(packingList);
      }
    }
    getList();
    return;
  }, [id]);

  return (
    <div>
      <h1 className="font-bold text-6xl mb-10">{packingList.name}</h1>
      <PackingList
        packingListId={id || ""}
        packingListName={packingList.name}
        categoryIds={packingList.categories}
      />
    </div>
  );
}
