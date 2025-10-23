import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSuggestionContext } from '../../hooks/useSuggestion';
import { commitCategoriesAPI } from '../../services/api/categories';
import CategorySuggestion from './CategorySuggestion';
import { SuggestedItem } from '../../models/ItemModel';
import { usePackingList } from '../../hooks/usePackingList';

export function AISuggestionsView({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const { suggestions, setSuggestions } = useSuggestionContext();
  // Get packingListId from URL params
  const { packingList } = usePackingList();

  // Query client
  const queryClient = useQueryClient();

  // Submitting the suggestions
  const { mutate, isPending } = useMutation({
    mutationFn: (suggestions: Record<string, SuggestedItem[]>) =>
      commitCategoriesAPI(packingList._id, suggestions),
    onSuccess: (data) => {
      console.log('Suggest category mutation successful', data);
      queryClient.invalidateQueries({
        queryKey: ['categories', packingList._id],
      });
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      setSuggestions({});
      handleClose();
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(suggestions).map(([category, items]) => (
        <CategorySuggestion category={category} items={items} />
      ))}
      <div className="modal-action flex-col gap-4 items-end justify-end mt-4">
        <button
          disabled={isPending}
          className="btn btn-accent w-full"
          onClick={() => mutate(suggestions)}
        >
          {isPending ? 'Adding...' : 'Add Suggestions'}
        </button>
      </div>
    </div>
  );
}
