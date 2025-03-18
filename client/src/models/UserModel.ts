import IPackingList from "./PackingListModel";

export default interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  packingLists: IPackingList[] | string[];
}
