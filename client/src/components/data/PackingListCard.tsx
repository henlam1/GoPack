import { useNavigate } from 'react-router-dom';
import privateRoutes from '../../routes/privateRoutes';
import { formatDate } from '../../utils/stringHelpers';
import Progress from '../feedback/Progress';

interface CardProps {
  _id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  destination: string;
  description: string;
  packedItems: number;
  totalItems: number;
  status: string;
  onEdit: () => void;
  onSoftDelete: () => void;
  onHardDelete: () => void;
  onRestore: () => void;
  onArchive: () => void;
}

export default function PackingListCard({
  _id,
  name,
  startDate,
  endDate,
  destination,
  description,
  packedItems,
  totalItems,
  status,
  onEdit,
  onSoftDelete,
  onHardDelete,
  onRestore,
  onArchive,
}: CardProps) {
  console.log(
    'Packing List: ',
    _id,
    name,
    startDate,
    endDate,
    destination,
    description,
    packedItems,
    totalItems,
    status,
  );
  const navigate = useNavigate();
  const progress = totalItems
    ? Math.round((packedItems / totalItems) * 100)
    : 0;

  function handleClick() {
    navigate(privateRoutes.packingLists.details(_id));
  }

  const actionsMap: Record<
    string,
    {
      label: string;
      type?: string;
      handler: () => void;
      destructive?: boolean;
    }[]
  > = {
    active: [
      { label: 'Edit', handler: onEdit },
      { label: 'Archive', handler: onArchive },
      { label: 'Trash', handler: onSoftDelete, destructive: true },
    ],
    trashed: [
      { label: 'Restore', handler: onRestore },
      { label: 'Delete Forever', handler: onHardDelete, destructive: true },
    ],
    archived: [
      { label: 'Restore', handler: onRestore },
      { label: 'Trash', handler: onSoftDelete, destructive: true },
    ],
  };

  function PackingListActions({ status }: { status: string }) {
    const actions = actionsMap[status] || [];
    return (
      <div className="flex items-center justify-between w-full">
        {/* Progress bar placeholder */}
        <div className="flex-1 mr-2 w-1/2">
          <Progress value={progress} />
        </div>

        {/* Ellipsis menu */}
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle bg-base-300 hover:bg-base-100"
          >
            ⋮
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-gray-500 rounded-box w-40"
          >
            {actions.map((action, i) => (
              <li key={i}>
                <a
                  className={`${
                    action.destructive
                      ? 'text-red-400 font-semibold'
                      : 'text-gray-100'
                  } hover:bg-gray-400`}
                  onClick={action.handler}
                >
                  {action.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-200 hover:bg-base-300 w-full shadow-sm">
      <div className="card-body flex flex-col">
        <div
          className="card-info hover:cursor-pointer space-y-2"
          onClick={handleClick}
        >
          {/* Title - most important */}
          <h2 className="card-title text-xl font-semibold">{name}</h2>

          {/* Meta info - subtle secondary text */}
          <div className="text-sm text-gray-300 space-y-1">
            <p className="font-medium text-gray-400">
              {formatDate(new Date(startDate))} –{' '}
              {formatDate(new Date(endDate))}
            </p>
            <p className="font-medium text-gray-400">
              {destination || 'No destination'}
            </p>
          </div>

          {/* Description - tertiary */}
          <p className="text-sm text-gray-500 line-clamp-2">
            {description || 'No description'}
          </p>
        </div>

        {/* Actions pinned at bottom */}
        <div className="card-actions mt-auto justify-end pt-4 border-t border-gray-300/30">
          <PackingListActions status={status} />
        </div>
      </div>
    </div>
  );
}
