import ICategory from "./CategoryModel";
import IUser from "./UserModel";

export default interface IPackingList {
  _id: string;
  name: string;
  categories: ICategory[] | string[];
  user: IUser | string;
}
