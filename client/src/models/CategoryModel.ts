export default interface ICategory {
  _id: string;
  name: string;
  items: string[];
  packedItems: number;
  totalItems: number;
  packingList: string;
}
