import { createContext } from 'react';
import { useItemActions } from '../hooks/useItemActions';
import { IItem } from '../models/ItemModel';

interface ItemContextValue {
  items: IItem[];
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
  actions: ReturnType<typeof useItemActions>;
  categoryId: string;
}
export const ItemContext = createContext<ItemContextValue | null>(null);
