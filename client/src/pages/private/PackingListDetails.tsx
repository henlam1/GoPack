import ItemForm from "../../components/forms/ItemForm";
import CategoryContainer from "../../containers/CategoryContainer";

// THIS PAGE DISPLAYS THE RELEVANT DETAILS OF A PACKING LIST
// PACKING LIST NAME
// PACKING LIST CATEGORIES
// PACKING LIST CATEGORY ITEMS
export default function PackingListDetailsPage() {
  // const examplePackingList = {};
  return (
    <div>
      VIEW/UPDATE PACKING LIST PAGE
      <CategoryContainer />
      <ItemForm />
    </div>
  );
}
