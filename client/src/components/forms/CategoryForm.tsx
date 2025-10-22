import { useForm } from 'react-hook-form';
import {
  categorySchema,
  CategoryFormFields,
  categoryDefaults,
} from '../../models/zod/categorySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategoryMutations } from '../../hooks/useCategoryMutations';
import { usePackingList } from '../../hooks/usePackingList';

export default function CategoryForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormFields>({
    defaultValues: categoryDefaults,
    resolver: zodResolver(categorySchema),
  });

  const { packingList } = usePackingList();
  const packingListId = packingList._id;

  // Hooks to manage item CRUD
  const { createCategory } = useCategoryMutations(packingListId);

  async function onSubmit(data: CategoryFormFields) {
    const linkedData = { ...data, packingList: packingListId };
    createCategory.mutate(linkedData);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
      <div className="join w-full">
        <input
          {...register('name')}
          type="text"
          placeholder="Category Name"
          className="input input-bordered join-item w-full"
        />
        <button
          type="submit"
          className="btn btn-primary join-item whitespace-nowrap"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Loading...' : 'Add Category'}
        </button>
      </div>

      {errors.name && (
        <p className="mt-2 text-error text-sm">{errors.name.message}</p>
      )}
    </form>
  );
}
