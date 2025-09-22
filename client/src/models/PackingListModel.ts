export default interface IPackingList {
  _id: string;
  name: string;
  categories: string[];
  user: string;
  startDate: Date;
  endDate: Date;
  destination: string;
  description: string;
  packedItems: number;
  totalItems: number;
  status: string;
}
