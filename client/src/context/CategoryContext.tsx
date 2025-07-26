import { createContext, useContext, useReducer } from 'react';

interface Props {
  children: React.ReactNode;
}
export interface CategoryContextType {
  editing: boolean;
}
const initialCategoryContext: CategoryContextType = {
  editing: false,
};

function categoryReducer(category: CategoryContextType, action: String) {
  switch (action) {
    case 'toggleEdit': {
      return {
        editing: !category.editing,
      };
    }
    default: {
      return initialCategoryContext;
    }
  }
}

export const CategoryContext = createContext(initialCategoryContext);
export const CategoryDispatchContext = createContext((a: any, b: any) =>
  console.log(a, b),
);

export function CategoryContextProvider({ children }: Props) {
  const [category, dispatch] = useReducer(
    categoryReducer,
    initialCategoryContext,
  );

  return (
    <CategoryContext.Provider value={category}>
      <CategoryDispatchContext.Provider value={dispatch}>
        {children}
      </CategoryDispatchContext.Provider>
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  return useContext(CategoryContext);
}

export function useCategoryDispatch() {
  return useContext(CategoryDispatchContext);
}
