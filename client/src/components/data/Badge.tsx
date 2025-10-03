import { XMarkIcon } from '@heroicons/react/24/outline';

export function Badge({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button type="button" onClick={onRemove} className="hover:cursor-pointer">
      <div className="badge badge-outline gap-1">
        {label}
        <XMarkIcon className="w-5 h-5" />
      </div>
    </button>
  );
}
