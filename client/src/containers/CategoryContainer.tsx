import Category from "../components/Category";
import ICategory from "../models/CategoryModel";

// CONTAINERS ARE RESPONSIBLE FOR MANAGING STATE AND PASSING DATA TO CHILD COMPONENTS
// CategoryContainer => Fetch Categories => Render Category(props)
// This is used in the packing list page to display categories in the accordion

// TODO: FIGURE OUT DATA FLOW AND FETCH
// TODO: CREATE CALLBACK FUNCTIONS TO PASS DOWN

interface CategoryCoatinerProps {
  categories: ICategory[];
}

export default function CategoryContainer({
  categories,
}: CategoryCoatinerProps) {

  return (
    <>
      {categories.map((category) => {
        return <Category {...category} />;
      })}
    </>
  );
}
