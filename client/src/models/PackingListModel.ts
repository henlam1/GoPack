export interface IPackingList {
  _id: string;
  name: string;
  categories: string[];
  user: string;
  startDate: string;
  endDate: string;
  destination: string;
  description: string;
  packedItems: number;
  totalItems: number;
  status: string;
}

export type IPackingListForm = Omit<
  IPackingList,
  '_id' | 'user' | 'packedItems' | 'totalItems'
>;
