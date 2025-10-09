import { useContext } from 'react';
import { SuggestionContext } from '../context/SuggestionContext';

export function useSuggestionContext() {
  const context = useContext(SuggestionContext);
  if (!context)
    throw new Error('useAuth should be used within SuggestionProvider');
  return context;
}
