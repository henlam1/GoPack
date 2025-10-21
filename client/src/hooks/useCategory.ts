import { useContext } from 'react';
import { CategoryContext } from '../context/CategoryContext';

export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context)
    throw new Error('useCategory should be used within CategoryProvider');
  return context;
}
