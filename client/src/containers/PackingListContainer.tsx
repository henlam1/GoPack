import CategoryContainer from "./CategoryContainer";

// CONTAINERS ARE RESPONSIBLE FOR MANAGING STATE AND PASSING DATA TO CHILD COMPONENTS
// PackingListContainer => Fetch packing lists => Render PackingListItem(props)
// This is used in the homepage to display cards of each packing list
export default function PackingListContainer() {
  return (
    <ul>
      Some packing lists
      <CategoryContainer />
    </ul>
  );
}
