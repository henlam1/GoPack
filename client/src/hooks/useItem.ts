import { useContext } from 'react';
import { ItemContext } from '../context/ItemContext';

export function useItem() {
  const context = useContext(ItemContext);
  if (!context) throw new Error('useItem should be used within ItemProvider');
  return context;
}
