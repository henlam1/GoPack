export default interface IPackingList {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  destination: string;
  description: string;
  categories: string[];
  user: string;
}
