import IItem from '../../models/ItemModel';

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
    <tr key={_id}>
      <td>
        <input
          name="packed"
          type="checkbox"
          className="checkbox checkbox-primary"
          checked={packed}
          onChange={() => onEdit(_id, { packed: !packed })()}
        />
      </td>
      <td>
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
      </td>
      <td>
        <input
          name="quantity"
          type="text"
          className="input input-bordered w-full"
          value={quantity}
          onChange={(e) => onEdit(_id, { quantity: +e.target.value })()}
        />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-error"
          onClick={onDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
