import IPackingList from "./PackingListModel";

export default interface IUser {
  username: string;
  email: string;
  password: string;
  packingLists: IPackingList[];
}
