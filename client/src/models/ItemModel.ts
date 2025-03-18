import ICategory from "./CategoryModel";

export default interface IItem {
  _id: string;
  name: string;
  quantity: number;
  packed: boolean;
  category: ICategory | string;
}
