import { useState } from 'react';
import ItemContainer from '../../containers/ItemContainer';
import ItemForm from '../forms/ItemForm';
import Progress from '../feedback/Progress';
import { ICategory } from '../../models/CategoryModel';
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';

interface Props {
  _id: string;
  name: string;
  packedItems?: number;
  totalItems?: number;
  // handlers...
  onMarkAllPacked: () => void;
  onMarkAllUnpacked: () => void;
  onEdit: (update: Partial<ICategory>) => void;
  onDelete: () => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

export default function CategoryCard({
  _id,
  name,
  packedItems = 0,
  totalItems = 0,
  onMarkAllPacked,
  onMarkAllUnpacked,
  onEdit,
  onDelete,
  dragHandleProps,
}: Props) {
  const [open, setOpen] = useState(true);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);

  const progress = totalItems
    ? Math.round((packedItems / totalItems) * 100)
    : 0;

  function saveName() {
    const trimmedDraft = draft.trim();
    if (trimmedDraft && draft !== name) onEdit({ name: trimmedDraft });
    setEditing(false);
    setDraft(trimmedDraft);
  }

  return (
    <div className="card bg-base-200 shadow-sm w-full mx-auto">
      {/* Row 1 */}
      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
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
        <div className="w-9/12 flex justify-between items-center">
          {/* Category name (inline edit) */}
          <div className="flex w-5/12">
            {editing ? (
              <input
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={saveName}
                onKeyDown={(e) => e.key === 'Enter' && saveName()}
                className="input input-sm input-bordered w-full max-w-xs"
              />
            ) : (
              <div className="flex items-center gap-2 w-full">
                <h3
                  className="font-medium text-lg break-words line-clamp-3 cursor-text max-w-10/12"
                  title={name}
                  onDoubleClick={() => setEditing(true)}
                >
                  {name}
                </h3>
                <PencilSquareIcon
                  className="cursor-pointer w-5 h-5"
                  onClick={() => setEditing(true)}
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-1/12 flex justify-center items-center">
          {/* Toggle button (only this toggles open/close) */}
          <button
            aria-expanded={open}
            aria-controls={`cat-${_id}-content`}
            onClick={() => setOpen((o) => !o)}
            className="btn btn-square btn-ghost btn-sm"
            title={open ? 'Collapse' : 'Expand'}
          >
            {/* chevron svg rotating */}
            <svg
              className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Row 2 */}
      <div className="px-4 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="w-1/12 flex justify-center items-center" />
        <div className="w-9/12 flex justify-between items-center">
          {/* Desktop progress bar */}
          <div className="hidden sm:block w-full">
            {/* Replace with your Progress component */}
            <Progress value={progress} />
          </div>
        </div>

        {/* Actions dropdown — IMPORTANT: it must not toggle the card */}
        <div className="w-1/12 flex justify-center items-center">
          <div
            className="dropdown dropdown-top dropdown-end"
            // defensive: make sure opening the dropdown doesn't toggle the card
            onClick={(e) => e.stopPropagation()}
          >
            <button className="btn btn-square btn-ghost btn-sm">
              <EllipsisVerticalIcon className="w-5 h-5" />
            </button>
            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44">
              <li>
                <button onClick={onMarkAllPacked}>Mark all packed</button>
              </li>
              <li>
                <button onClick={onMarkAllUnpacked}>Mark all unpacked</button>
              </li>
              <li>
                <button className="text-error" onClick={onDelete}>
                  Delete category
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* COLLAPSED CONTENT */}
      <div
        id={`cat-${_id}-content`}
        className={`overflow-hidden transition-[max-height] duration-200 ${open ? 'max-h-[1000px]' : 'max-h-0'}`}
      >
        {open && (
          <div className="p-4 bg-base-200">
            <div className="flex flex-col gap-4">
              {/* <div key={_id} className="flex justify-between items-center py-2">
                <div className="w-1/12 flex justify-center"></div>
                <div className="w-5/12">Name</div>
                <div className="w-2/12">Quantity</div>
                <div className="w-1/12"></div>
              </div> */}
              <ItemContainer categoryId={_id} />
              <ItemForm categoryId={_id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
