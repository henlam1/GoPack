import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="btn btn-sm btn-circle" onClick={onClick}>
      <ArrowLeftIcon className="w-5 h-5" />
    </button>
  );
}
