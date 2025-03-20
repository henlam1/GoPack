import { useParams } from "react-router-dom";
import CategoryContainer from "../../containers/CategoryContainer";
import { useQuery } from "@tanstack/react-query";
import { getPackingList } from "../../services/api/packingLists";
import CategoryForm from "../../components/forms/CategoryForm";

// THIS PAGE DISPLAYS THE RELEVANT DETAILS OF A PACKING LIST
// PACKING LIST NAME
// PACKING LIST CATEGORIES
// PACKING LIST CATEGORY ITEMS
export default function PackingListDetailsPage() {
  let { id } = useParams();
  id = id as string;

  const {
    data: packingList,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["packingList", id],
    queryFn: () => getPackingList(id), // Ideally getUserPackingLists or something
  });
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  
  return (
    <div>
      VIEW/UPDATE PACKING LIST PAGE ID: {id}
      <CategoryContainer categories={packingList.categories} />
      <CategoryForm packingListId={id}/>
    </div>
  );
}
