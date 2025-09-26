import { useForm } from 'react-hook-form';
import {
  itemSchema,
  ItemFormFields,
  itemDefaults,
} from '../../models/zod/itemSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useItemMutations } from '../../hooks/useItemMutations';
import { useParams } from 'react-router-dom';

interface ItemFormProps {
  categoryId: string;
  children: JSX.Element;
}

export default function ItemForm({ categoryId, children }: ItemFormProps) {
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

  function TableHead() {
    return (
      <thead>
        <tr>
          <th>Packed</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
    );
  }

  function FormTable() {
    return (
      <tr>
        {/* Empty TD for checkbox */}
        <td />
        <td>
          <label className="form-control floating-label mb-2">
            <span className="label-text">{'Item Name'}</span>
            <input
              type={'text'}
              placeholder={'item name'}
              className="input input-bordered w-full"
              {...register('name')}
            />
            {errors && (
              <p className="text-error text-sm mt-1">{errors.name?.message}</p>
            )}
          </label>
        </td>
        <td>
          <label className="form-control floating-label mb-2">
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
        </td>
        <td>
          <button
            disabled={isSubmitting}
            className="btn btn-sm btn-accent"
            type="submit"
          >
            {isSubmitting ? 'Adding...' : 'Add'}
          </button>
        </td>
      </tr>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table className="table w-full">
        <TableHead />
        <tbody>
          {children}
          {/* Form Table */}
          <FormTable />
        </tbody>
      </table>
    </form>
  );
}
