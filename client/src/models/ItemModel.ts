export interface IItem {
  _id: string;
  name: string;
  quantity: number;
  packed: boolean;
  category: string;
}

export interface SuggestedItem {
  name: string;
  quantity: number;
  note?: string;
}
