import { useForm } from 'react-hook-form';
import {
  categorySchema,
  CategoryFormFields,
  categoryDefaults,
} from '../../models/zod/categorySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategoryMutations } from '../../hooks/useCategoryMutations';

export default function CategoryForm({
  packingListId,
}: {
  packingListId: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormFields>({
    defaultValues: categoryDefaults,
    resolver: zodResolver(categorySchema),
  });

  // Hooks to manage item CRUD
  const { createCategory } = useCategoryMutations(packingListId);

  async function onSubmit(data: CategoryFormFields) {
    const linkedData = { ...data, packingList: packingListId };
    createCategory.mutate(linkedData);
    reset();
  }

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit(onSubmit)} className="join">
        <input
          {...register('name')}
          type="text"
          placeholder="Category name"
          className="input join-item"
        />
        <button className="btn btn-primary join-item">
          {isSubmitting ? 'Loading...' : 'Add New Category'}
        </button>
      </form>
      {errors.name && <p className="block text-error">{errors.name.message}</p>}
    </div>
  );
}
