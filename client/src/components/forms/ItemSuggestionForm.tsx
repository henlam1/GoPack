import { PlusIcon } from '@heroicons/react/24/outline';
import { useSuggestionContext } from '../../hooks/useSuggestion';
import { useState } from 'react';

export default function ItemSuggestionForm({ category }: { category: string }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useSuggestionContext();
  return (
    <form
      onSubmit={() => addItem(category, { name: name, quantity: quantity })}
    >
      <div className="flex justify-between items-center px-4 pt-2 pb-4 bg-base-300">
        <div className="w-6/12 flex flex-row justify-between gap-4">
          <div className="w-full">
            <label className="form-control floating-label">
              <span className="label-text">{'Item Name'}</span>
              <input
                type={'text'}
                placeholder={'Add Item'}
                maxLength={30}
                className="input input-bordered w-full"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className="w-1/12 my-auto"></div>
        </div>
        <div className="w-2/12">
          <label className="form-control floating-label">
            <span className="label-text">{'Quantity'}</span>
            <input
              type={'number'}
              placeholder={'Quantity'}
              min={1}
              max={99}
              className="input input-bordered w-full"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="w-1/12">
          <button className="btn btn-square btn-sm btn-accent">
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
}
