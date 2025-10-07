import { SuggestedItem } from '../../models/ItemModel';
import DeleteButton from '../buttons/DeleteButton';

interface SuggestionCategoryProps {
  category: string;
  items: SuggestedItem[];
  removeCategory: (category: string) => void;
  renameCategory: (oldName: string, newName: string) => void;
  addItem: (category: string, newItem: SuggestedItem) => void;
  removeItem: (category: string, index: number) => void;
  editItem: (category: string, index: number, newItem: SuggestedItem) => void;
}

export default function SuggestionCategory({
  category,
  items,
  removeCategory,
  renameCategory,
  addItem,
  removeItem,
  editItem,
}: SuggestionCategoryProps) {
  return (
    <div className="card bg-base-200 shadow-sm w-full mx-auto">
      <div className="flex justify-between items-center">
        <input
          value={category}
          onChange={(e) => renameCategory(category, e.target.value)}
          className="font-semibold text-lg"
        />
        <DeleteButton onClick={() => removeCategory(category)} />
      </div>

      <ul>
        {items.map((item, i) => (
          <li
            key={i}
            className="flex flex-col gap-2 p-2 border-b border-base-200"
          >
            {/* Name and quantity inline */}
            <div className="input-group">
              <input
                value={item.name}
                onChange={(e) =>
                  editItem(category, i, { ...item, name: e.target.value })
                }
                placeholder="Item name"
                className="input input-bordered flex-1"
              />
              <input
                type="number"
                value={item.quantity}
                min={1}
                onChange={(e) =>
                  editItem(category, i, {
                    ...item,
                    quantity: Number(e.target.value),
                  })
                }
                className="input input-bordered w-20 text-center"
                placeholder="Qty"
              />
              <button
                type="button"
                onClick={() => removeItem(category, i)}
                className="btn btn-ghost text-error"
              >
                ✕
              </button>
            </div>

            {/* Optional note field */}
            <input
              value={item.note ?? ''}
              disabled
              className="input input-bordered w-full text-sm"
            />
          </li>
        ))}
      </ul>

      <button
        onClick={() => addItem(category, { name: '', quantity: 1, note: '' })}
      >
        + Add item
      </button>
    </div>
  );
}
