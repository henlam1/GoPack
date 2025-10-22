import { useContext } from 'react';
import { PackingListContext } from '../context/PackingListContext';

export function usePackingList() {
  const context = useContext(PackingListContext);
  if (!context)
    throw new Error('usePackingList should be used within PackingListProvider');
  return context;
}
