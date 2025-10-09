import { useForm } from 'react-hook-form';
import {
  itemSchema,
  ItemFormFields,
  itemDefaults,
} from '../../models/zod/itemSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useItemMutations } from '../../hooks/useItemMutations';
import { useParams } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';

interface ItemFormProps {
  categoryId: string;
}

export default function ItemForm({ categoryId }: ItemFormProps) {
  // URL params
  let { id } = useParams();
  id = id as string;

  // Form submission functions
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ItemFormFields>({
    defaultValues: itemDefaults,
    resolver: zodResolver(itemSchema),
  });

  // Hooks to manage item CRUD
  const { createItem } = useItemMutations(id, categoryId);

  async function onSubmit(data: ItemFormFields) {
    const linkedData = { ...data, category: categoryId };
    createItem.mutate(linkedData);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center py-2">
        <div className="w-1/12"></div>
        <div className="w-5/12">
          <label className="form-control floating-label">
            <span className="label-text">{'Item Name'}</span>
            <input
              type={'text'}
              placeholder={'Add Item'}
              className="input input-bordered w-full"
              {...register('name')}
            />
            {errors && (
              <p className="text-error text-sm mt-1">{errors.name?.message}</p>
            )}
          </label>
        </div>
        <div className="w-2/12">
          <label className="form-control floating-label">
            <span className="label-text">{'Quantity'}</span>
            <input
              type={'number'}
              placeholder={'quantity'}
              className="input input-bordered w-full"
              {...register('quantity')}
            />
            {errors && (
              <p className="text-error text-sm mt-1">
                {errors.quantity?.message}
              </p>
            )}
          </label>
        </div>
        <div className="w-1/12">
          <button
            disabled={isSubmitting}
            className="btn btn-square btn-sm btn-accent"
            type="submit"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
}
