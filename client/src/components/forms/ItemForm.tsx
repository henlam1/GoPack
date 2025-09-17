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
              <input
                type="checkbox"
                className="checkbox checkbox-primary disabled"
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

    // <>
    //   {showForm && (
    //     <form
    //       onSubmit={handleSubmit(onSubmit)}
    //       className="grid grid-cols-3 gap-4"
    //     >
    //       <span>
    //         <input
    //           {...register('name')}
    //           type="text"
    //           placeholder="Item name"
    //           className="input validator"
    //         />
    //         {errors.name && (
    //           <p className="block text-error">{errors.name.message}</p>
    //         )}
    //       </span>

    //       <span>
    //         <input
    //           {...register('quantity')}
    //           type="number"
    //           className="input validator"
    //           min="1"
    //         />
    //         {errors.quantity && (
    //           <p className="block text-errort">{errors.quantity.message}</p>
    //         )}
    //       </span>

    //       <span className="flex gap-1">
    //         <button className="btn btn-square btn-success text-2xl">
    //           {isSubmitting ? '...' : '+'}
    //         </button>
    //         <button
    //           className="btn btn-square btn-neutral"
    //           onClick={(e) => {
    //             reset();
    //             e.stopPropagation();
    //             toggleShowForm();
    //           }}
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="currentColor"
    //             viewBox="0 0 24 24"
    //             className="size-[2em]"
    //             stroke="currentColor"
    //           >
    //             <path d="M13.775,18.707,8.482,13.414a2,2,0,0,1,0-2.828l5.293-5.293,1.414,1.414L9.9,12l5.293,5.293Z" />
    //           </svg>
    //         </button>
    //       </span>
    //     </form>
    //   )}
    //   {!showForm && (
    //     <button className="btn btn-primary" onClick={toggleShowForm}>
    //       {isSubmitting ? '...' : '+ Item'}
    //     </button>
    //   )}
    // </>
  );
}
