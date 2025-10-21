import { createContext } from 'react';
import { useCategoryActions } from '../hooks/useCategoryActions';
import { ICategory } from '../models/CategoryModel';

interface CategoryContextValue {
  categories: ICategory[];
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
  actions: ReturnType<typeof useCategoryActions>;
}
export const CategoryContext = createContext<CategoryContextValue | null>(null);
