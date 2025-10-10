import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
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
    <div className="flex justify-between items-center px-4 py-2 bg-base-300">
      <div className="w-6/12 flex flex-row justify-between gap-4">
        <div className="w-full">
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
        <div className="w-1/12 my-auto">
          {item.note && (
            <div className="tooltip" data-tip={`${item.note}`}>
              <InformationCircleIcon className="h-5 w-5" />
            </div>
          )}
        </div>
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
