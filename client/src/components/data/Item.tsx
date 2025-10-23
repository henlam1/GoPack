import { IItem } from '../../models/ItemModel';
import { TrashIcon } from '@heroicons/react/24/outline';

interface ItemProps {
  _id: string;
  packed: boolean;
  name: string;
  quantity: number;
  onEdit: (id: string, update: Partial<IItem>) => () => void;
  onDelete: () => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}
export default function Item({
  _id,
  packed,
  name,
  quantity,
  onEdit,
  onDelete,
  dragHandleProps,
}: ItemProps) {
  return (
    <div key={_id} className="flex justify-between items-center py-2">
      {/* Drag handle area */}
      <div
        className="w-1/12 flex justify-center items-center"
        {...dragHandleProps}
      >
        {/* Grip icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-gray-500 cursor-grab active:cursor-grabbing"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 9h.01M8 15h.01M12 9h.01M12 15h.01M16 9h.01M16 15h.01"
          />
        </svg>
      </div>
      {/* Item Content */}
      <div className="w-9/12 flex justify-between">
        <div className="w-1/12 flex justify-center items-center">
          <input
            name="packed"
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={packed}
            onChange={() => onEdit(_id, { packed: !packed })()}
          />
        </div>
        <div className="w-6/12">
          <input
            name="name"
            type="text"
            className={
              packed
                ? 'line-through text-gray-400 input input-bordered w-full'
                : 'input input-bordered w-full'
            }
            value={name}
            onChange={(e) => onEdit(_id, { name: e.target.value })()}
          />
        </div>
        <div className="w-2/12">
          <input
            name="quantity"
            type="text"
            className="input input-bordered w-full"
            value={quantity}
            onChange={(e) => onEdit(_id, { quantity: +e.target.value })()}
          />
        </div>
      </div>
      {/* Trash Button */}
      <div className="w-1/12 flex justify-center items-center">
        <button
          type="button"
          className="btn btn-square btn-sm btn-error"
          onClick={() => onDelete()}
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
