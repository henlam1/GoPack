import { useQuery } from "@tanstack/react-query";
import { getItems } from "../services/api/items";
import Category from "../components/Category";

// CONTAINERS ARE RESPONSIBLE FOR MANAGING STATE AND PASSING DATA TO CHILD COMPONENTS
// CategoryContainer => Fetch Categories => Render Category(props)
// This is used in the packing list page to display categories in the accordion

// TODO: FIGURE OUT DATA FLOW AND FETCH
// TODO: CREATE CALLBACK FUNCTIONS TO PASS DOWN
export default function CategoryContainer() {
  const exampleCategories = ["category1", "category2", "category3"];
  const {
    data: items,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });
  console.log("CategoryContainer: ", exampleCategories);
  return (
    <>
      {isPending && <div>Loading...</div>}
      {isError && <div>Error...</div>}
      {!isPending &&
        exampleCategories.map((category) => {
          return <Category title={category} items={items} />;
        })}
    </>
  );
}
