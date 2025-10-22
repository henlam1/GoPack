import { createContext } from 'react';
import { usePackingListActions } from '../hooks/usePackingListActions';
import { IPackingList } from '../models/PackingListModel';

interface PackingListContextValue {
  packingList: IPackingList;
  setPackingList: React.Dispatch<React.SetStateAction<IPackingList>>;
  actions: ReturnType<typeof usePackingListActions>;
}
export const PackingListContext = createContext<PackingListContextValue | null>(
  null,
);
