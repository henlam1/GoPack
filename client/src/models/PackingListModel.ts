export interface IPackingList {
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

export type IPackingListForm = Omit<
  IPackingList,
  '_id' | 'user' | 'packedItems' | 'totalItems'
>;
