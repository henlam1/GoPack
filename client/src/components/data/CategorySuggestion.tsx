import { useSuggestionContext } from '../../hooks/useSuggestion';
import { SuggestedItem } from '../../models/ItemModel';
import DeleteButton from '../buttons/DeleteButton';
import ItemSuggestionForm from '../forms/ItemSuggestionForm';
import ItemSuggestion from './ItemSuggestion';

interface SuggestionCategoryProps {
  category: string;
  items: SuggestedItem[];
}

export default function SuggestionCategory({
  category,
  items,
}: SuggestionCategoryProps) {
  const { removeCategory, renameCategory } = useSuggestionContext();
  return (
    <div className="card bg-base-200 shadow-sm w-full mx-auto">
      {/* HEADER */}
      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {/* Left: name (inline edit) */}
        <div className="flex w-5/12">
          <input
            value={category}
            onChange={(e) => renameCategory(category, e.target.value)}
            className="font-semibold text-lg"
          />
        </div>
        <DeleteButton onClick={() => removeCategory(category)} />
      </div>

      <div className="bg-base-100">
        <div className="flex flex-col">
          <div className="flex justify-between items-center p-4 bg-base-300">
            <div className="w-5/12">Name</div>
            <div className="w-2/12">Quantity</div>
            <div className="w-1/12"></div>
          </div>
          {items.map((item, i) => (
            <ItemSuggestion item={item} index={i} category={category} />
          ))}
          <ItemSuggestionForm category={category} />
        </div>
      </div>
    </div>
  );
}
