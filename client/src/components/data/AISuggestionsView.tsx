import { useSuggestionContext } from '../../hooks/useSuggestion';
import SuggestionCategory from './CategorySuggestion';

export function AISuggestionsView() {
  const { suggestions } = useSuggestionContext();
  // Submitting the suggestions
  // const { mutate } = useMutation({
  //     mutationFn: suggestCategoriesAPI,
  //     onSuccess: (data) => {
  //       console.log('Suggest category mutation successful', data);
  //       setSuggestions(data);
  //       setStep('results');
  //     },
  //     onError: (error) => {
  //       if (error instanceof APIError) {
  //         setError('root', { message: 'API Error' });
  //       } else {
  //         setError('root', { message: 'Network error' });
  //       }
  //     },
  //   });

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(suggestions).map(([category, items]) => (
        <SuggestionCategory category={category} items={items} />
      ))}
    </div>
  );
}
