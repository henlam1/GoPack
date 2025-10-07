import { TrashIcon } from '@heroicons/react/24/outline';

export default function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="btn btn-sm btn-circle" onClick={onClick}>
      <TrashIcon className="w-5 h-5" />
    </button>
  );
}
