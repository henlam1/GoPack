import { createContext } from 'react';
import { SuggestedItem } from '../models/ItemModel';

interface SuggestionContextValue {
  suggestions: Record<string, SuggestedItem[]>;
  setSuggestions: React.Dispatch<
    React.SetStateAction<Record<string, SuggestedItem[]>>
  >;
  removeCategory: (category: string) => void;
  renameCategory: (oldName: string, newName: string) => void;
  addItem: (category: string, newItem: SuggestedItem) => void;
  removeItem: (category: string, index: number) => void;
  editItem: (category: string, index: number, newItem: SuggestedItem) => void;
}
export const SuggestionContext = createContext<SuggestionContextValue | null>(
  null,
);
