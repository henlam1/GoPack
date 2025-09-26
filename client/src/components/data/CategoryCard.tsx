import { useState } from 'react';
import ItemContainer from '../../containers/ItemContainer';
import ItemForm from '../forms/ItemForm';
import Progress from '../feedback/Progress';
import { ICategory } from '../../models/CategoryModel';

interface Props {
  _id: string;
  name: string;
  packedItems?: number;
  totalItems?: number;
  // handlers...
  onMarkAllPacked: () => void;
  onMarkAllUnpacked: () => void;
  onEdit: (id: string, update: Partial<ICategory>) => void;
  onDelete: () => void;
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
}: Props) {
  const [open, setOpen] = useState(true);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);

  const progress = totalItems
    ? Math.round((packedItems / totalItems) * 100)
    : 0;

  function saveName() {
    if (draft.trim() && draft !== name) onEdit(_id, { name: draft.trim() });
    setEditing(false);
  }

  return (
    <div className="card bg-base-100 shadow-sm">
      {/* HEADER */}
      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {/* Left: name (inline edit) */}
        <div className="flex items-center min-w-0 gap-2">
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
            <h3
              className="font-medium text-lg truncate cursor-text"
              title={name}
              onDoubleClick={() => setEditing(true)}
            >
              {name}
            </h3>
          )}
        </div>

        {/* Right: progress + actions + toggle */}
        <div className="flex items-center gap-3">
          {/* Desktop progress bar */}
          <div className="hidden sm:block w-40">
            {/* Replace with your Progress component */}
            <Progress value={progress} />
          </div>

          {/* Actions dropdown — IMPORTANT: it must not toggle the card */}
          <div
            className="dropdown dropdown-end"
            // defensive: make sure opening the dropdown doesn't toggle the card
            onClick={(e) => e.stopPropagation()}
          >
            <label tabIndex={0} className="btn btn-ghost btn-sm">
              ⋮
            </label>
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

          {/* Toggle button (only this toggles open/close) */}
          <button
            aria-expanded={open}
            aria-controls={`cat-${_id}-content`}
            onClick={() => setOpen((o) => !o)}
            className="btn btn-ghost btn-sm"
            title={open ? 'Collapse' : 'Expand'}
          >
            {/* chevron svg rotating */}
            <svg
              className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
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

        {/* Mobile progress (below the name) */}
        <div className="sm:hidden mt-2 w-full">
          <div className="h-2 bg-base-300 rounded overflow-hidden">
            <div
              className="h-2 bg-primary rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-muted text-right mt-1">
            {packedItems}/{totalItems}
          </div>
        </div>
      </div>

      {/* COLLAPSED CONTENT */}
      <div
        id={`cat-${_id}-content`}
        className={`overflow-hidden transition-[max-height] duration-200 ${open ? 'max-h-[1000px]' : 'max-h-0'}`}
      >
        {open && (
          <div className="p-4">
            {/* Fetch-on-open note:
                If ItemContainer uses useQuery, you can pass `enabled={open}` so it only fetches when open.
            */}
            <ItemForm categoryId={_id}>
              <ItemContainer categoryId={_id} />
            </ItemForm>
          </div>
        )}
      </div>
    </div>
  );
}
