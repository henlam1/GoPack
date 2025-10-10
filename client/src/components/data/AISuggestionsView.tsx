import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSuggestionContext } from '../../hooks/useSuggestion';
import { commitCategoriesAPI } from '../../services/api/categories';
import CategorySuggestion from './CategorySuggestion';
import { useParams } from 'react-router-dom';
import { SuggestedItem } from '../../models/ItemModel';

export function AISuggestionsView({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const { suggestions, setSuggestions } = useSuggestionContext();
  // Get packingListId from URL params
  // TODO: PACKING LIST CONTEXT, CATEGORY CONTEXT
  let { id } = useParams();
  id = id as string;

  // Query client
  const queryClient = useQueryClient();

  // Submitting the suggestions
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      packingListId,
      suggestions,
    }: {
      packingListId: string;
      suggestions: Record<string, SuggestedItem[]>;
    }) => commitCategoriesAPI(packingListId, suggestions),
    onSuccess: (data) => {
      console.log('Suggest category mutation successful', data);
      queryClient.invalidateQueries({
        queryKey: ['categories', id],
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
          onClick={() => mutate({ packingListId: id, suggestions })}
        >
          {isPending ? 'Adding...' : 'Add Suggestions'}
        </button>
      </div>
    </div>
  );
}
