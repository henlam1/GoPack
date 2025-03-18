import ItemContainer from "../containers/ItemContainer";
import IItem from "../models/ItemModel";
import ItemForm from "./forms/ItemForm";

interface CategoryProps {
  title: string;
  items: IItem[];
}

export default function Category({ title, items }: CategoryProps) {
  return (
    <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
      <input type="checkbox" />
      <div className="collapse-title font-semibold">{title}</div>
      <div className="collapse-content text-sm">
        <ItemContainer items={items} />
        <h1>Item Form</h1>
        <ItemForm />
      </div>
    </div>
  );
}
