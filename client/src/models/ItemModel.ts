import ICategory from "./CategoryModel";

export default interface IItem {
  name: string,
  quantity: number,
  packed: boolean,
  category: ICategory,
}