import React, { useEffect, useRef, useState } from 'react';
import { FormInput } from './FormInput';
import { Badge } from '../data/Badge';

interface DropdownSelectProps {
  label: string;
  options: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
  error?: string;
  top?: boolean;
}

export const DropdownSelect: React.FC<DropdownSelectProps> = ({
  label,
  options,
  value = [],
  onChange = () => {},
  error,
  top = false,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase()),
  );

  const availableOptions = filtered.filter((opt) => !value.includes(opt));

  const handleSelect = (opt: string) => {
    onChange([...value, opt]);
  };

  const handleRemove = (opt: string) => {
    onChange(value.filter((v) => v !== opt));
  };

  // Close if clicked outside the container
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`dropdown w-full ${open ? 'dropdown-open' : ''} ${top ? 'dropdown-top' : ''}`}
    >
      {/* Input trigger */}
      <FormInput
        label={label}
        type="search"
        placeholder={`Suggested ${label.toLowerCase()}`}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            // Prevent form submission
            e.preventDefault();

            // Automatically select first input
            if (availableOptions.length > 0) {
              handleSelect(availableOptions[0]);
              setQuery('');
            }
          }
        }}
      />

      {/* Dropdown menu */}
      {open && (
        <ul className="dropdown-content bg-base-200 rounded-box z-10 w-full mt-1 shadow max-h-48 overflow-y-auto">
          {availableOptions.map((option) => (
            <li key={option}>
              <button
                type="button"
                className="block w-full text-left px-4 py-2 hover:bg-base-300"
                onMouseDown={() => {
                  handleSelect(option);
                  setQuery('');
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-center w-full">
        {value.length === 0 ? (
          <p className="p-2 text-gray-500">{`No ${label} selected yet`}</p>
        ) : (
          <div className="flex flex-row justify-center flex-wrap gap-4 p-4">
            {value.map((value) => (
              <Badge label={value} onRemove={() => handleRemove(value)} />
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  );
};
