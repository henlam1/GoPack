import { IItem } from '../../models/ItemModel';
import { TrashIcon } from '@heroicons/react/24/outline';

interface ItemProps {
  _id: string;
  packed: boolean;
  name: string;
  quantity: number;
  onEdit: (id: string, update: Partial<IItem>) => () => void;
  onDelete: () => void;
}
export default function Item({
  _id,
  packed,
  name,
  quantity,
  onEdit,
  onDelete,
}: ItemProps) {
  return (
    <div key={_id} className="flex justify-between items-center py-2">
      <div className="w-1/12 flex justify-center">
        <input
          name="packed"
          type="checkbox"
          className="checkbox checkbox-primary"
          checked={packed}
          onChange={() => onEdit(_id, { packed: !packed })()}
        />
      </div>
      <div className="w-5/12">
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
      <div className="w-1/12">
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
