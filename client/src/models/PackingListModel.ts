export default interface IPackingList {
  _id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  destination: string;
  description: string;
  status: string;
  categories: string[];
  user: string;
}
