import ICategory from "./CategoryModel";
import IUser from "./UserModel";

export default interface IPackingList {
  name: string;
  categories: ICategory[];
  user: IUser | string;
}
