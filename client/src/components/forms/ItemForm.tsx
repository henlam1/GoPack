import { useForm } from 'react-hook-form';
import {
  itemSchema,
  ItemFormFields,
  itemDefaults,
} from '../../models/zod/itemSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useItemMutations } from '../../hooks/useItemMutations';
import { FormInput } from './FormInput';

interface ItemFormProps {
  categoryId: string;
  children: JSX.Element;
}

export default function ItemForm({ categoryId, children }: ItemFormProps) {
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
  const { createItem } = useItemMutations(categoryId);

  async function onSubmit(data: ItemFormFields) {
    const linkedData = { ...data, category: categoryId };
    createItem.mutate(linkedData);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Packed</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {children}
          {/* Form Table */}
          <tr>
            <td>
              <FormInput
                label=""
                {...register('packed')}
                error={errors.packed?.message}
              />
            </td>
            <td>
              <FormInput
                label=""
                placeholder="item name"
                {...register('name')}
                error={errors.name?.message}
              />
            </td>
            <td>
              <FormInput
                label=""
                type="number"
                placeholder="quantity"
                {...register('quantity')}
                error={errors.quantity?.message}
              />
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
        </tbody>
      </table>
    </form>
  );
}
