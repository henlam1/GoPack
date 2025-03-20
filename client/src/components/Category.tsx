import ItemContainer from "../containers/ItemContainer";
import ICategory from "../models/CategoryModel";
import IItem from "../models/ItemModel";
import ItemForm from "./forms/ItemForm";

export default function Category({ _id, name, items, packingList }: ICategory) {
  console.log("Category: ", name, items, packingList);
  return (
    <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
      <input type="checkbox" />
      <div className="collapse-title font-semibold">{name}</div>
      <div className="collapse-content text-sm">
        <ItemContainer items={items as IItem[]} />
        <h1>Item Form</h1>
        <ItemForm categoryId={_id}/>
      </div>
    </div>
  );
}
