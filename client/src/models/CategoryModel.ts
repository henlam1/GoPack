export interface ICategory {
  _id: string;
  name: string;
  items: string[];
  packedItems: number;
  totalItems: number;
  packingList: string;
}

export type ICategoryForm = Omit<
  ICategory,
  '_id' | 'packedItems' | 'totalItems'
>;
