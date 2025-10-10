import { useSuggestionContext } from '../../hooks/useSuggestion';
import { SuggestedItem } from '../../models/ItemModel';
import DeleteButton from '../buttons/DeleteButton';
import ItemSuggestionForm from '../forms/ItemSuggestionForm';
import ItemSuggestion from './ItemSuggestion';

interface CategorySuggestionProps {
  category: string;
  items: SuggestedItem[];
}

export default function CategorySuggestion({
  category,
  items,
}: CategorySuggestionProps) {
  const { removeCategory, renameCategory } = useSuggestionContext();
  return (
    <div className="card bg-base-200 shadow-sm w-full mx-auto">
      {/* Category Header */}
      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-6/12">
          <input
            value={category}
            onChange={(e) => renameCategory(category, e.target.value)}
            className="font-semibold text-lg"
          />
        </div>
        <div className="w-2/12"></div>
        <div className="w-1/12">
          <DeleteButton onClick={() => removeCategory(category)} />
        </div>
      </div>

      {/* Suggested Items */}
      <div className="bg-base-100">
        <div className="flex flex-col">
          {/* Column Headers */}
          <div className="flex justify-between items-center p-4 bg-base-300">
            <div className="w-6/12">Name</div>
            <div className="w-2/12">Quantity</div>
            <div className="w-1/12"></div>
          </div>
          {/* Item Display */}
          {items.map((item, i) => (
            <ItemSuggestion
              key={`${item.name}-${i}`}
              item={item}
              index={i}
              category={category}
            />
          ))}
          <ItemSuggestionForm category={category} />
        </div>
      </div>
    </div>
  );
}
