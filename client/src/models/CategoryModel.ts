import IItem from "./ItemModel";
import IPackingList from "./PackingListModel";

export default interface ICategory {
  name: string;
  items: IItem[];
  packingList: IPackingList | string;
}
