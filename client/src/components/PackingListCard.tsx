import { useNavigate } from 'react-router-dom';
import privateRoutes from '../routes/privateRoutes';
import { formatDate } from '../utils/stringHelpers';

interface CardProps {
  _id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  destination: string;
  description: string;
  status: string;
  onEdit?: () => void;
  onSoftDelete?: () => void;
  onHardDelete?: () => void;
  onRestore?: () => void;
  onComplete?: () => void;
}

export default function PackingListCard({
  _id,
  name,
  startDate,
  endDate,
  destination,
  description,
  status,
  onEdit,
  onSoftDelete,
  onHardDelete,
  onRestore,
  onComplete,
}: CardProps) {
  console.log('Packing List: ', _id, name);
  const navigate = useNavigate();

  function handleClick() {
    navigate(privateRoutes.packingLists.details(_id));
  }

  function PackingListActions({ status }: { status: string }) {
    switch (status) {
      case 'active':
        return (
          <>
            <button className="btn btn-primary" onClick={onEdit}>
              Edit
            </button>
            <button className="btn btn-primary" onClick={onComplete}>
              Mark Complete
            </button>
            <button className="btn btn-secondary" onClick={onSoftDelete}>
              Trash
            </button>
          </>
        );
      case 'trashed':
        return (
          <>
            <button className="btn btn-primary" onClick={onRestore}>
              Restore
            </button>
            <button className="btn btn-secondary" onClick={onHardDelete}>
              Delete Permanently
            </button>
          </>
        );
      case 'completed':
        return (
          <>
            <button className="btn btn-primary" onClick={onRestore}>
              Restore
            </button>
            <button className="btn btn-secondary" onClick={onSoftDelete}>
              Trash
            </button>
          </>
        );
    }
  }

  return (
    <div className="card bg-base-200 hover:bg-base-300 w-96 shadow-sm basis-sm">
      <div className="card-body">
        <div className="card-info hover:cursor-pointer" onClick={handleClick}>
          <h2 className="card-title">{name}</h2>
          <p>
            {formatDate(new Date(startDate))} - {formatDate(new Date(endDate))}
          </p>
          <p>{destination}</p>
          <p>{description}</p>
        </div>
        <div className="card-actions mt-auto justify-end">
          <PackingListActions status={status} />
        </div>
      </div>
    </div>
  );
}
