import IItem from "./ItemModel";
import IPackingList from "./PackingListModel";

export default interface ICategory {
  _id: string;
  name: string;
  items: IItem[] | string[];
  packingList: IPackingList | string;
}
