import { XMarkIcon } from '@heroicons/react/24/outline';

export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="btn btn-sm btn-circle" onClick={onClick}>
      <XMarkIcon className="w-5 h-5" />
    </button>
  );
}
