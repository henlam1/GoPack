import { XMarkIcon } from '@heroicons/react/24/outline';
import { SuggestedItem } from '../../models/ItemModel';
import { useSuggestionContext } from '../../hooks/useSuggestion';

interface ItemSuggestionProps {
  item: SuggestedItem;
  index: number;
  category: string;
}

export default function ItemSuggestion({
  item,
  index,
  category,
}: ItemSuggestionProps) {
  const { editItem, removeItem } = useSuggestionContext();
  return (
    <div
      key={`${item.name}-${index}`}
      className="flex justify-between items-center px-4 py-2 bg-base-300"
    >
      <div className="w-5/12">
        <input
          name="name"
          type="text"
          className="input input-bordered w-full"
          value={item.name}
          onChange={(e) =>
            editItem(category, index, { ...item, name: e.target.value })
          }
        />
      </div>
      <div className="w-2/12">
        <input
          name="quantity"
          type="text"
          className="input input-bordered w-full"
          value={item.quantity}
          onChange={(e) =>
            editItem(category, index, {
              ...item,
              quantity: Number(e.target.value),
            })
          }
        />
      </div>
      <div className="w-1/12">
        <button
          type="button"
          className="btn btn-square btn-sm btn-error"
          onClick={() => removeItem(category, index)}
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
