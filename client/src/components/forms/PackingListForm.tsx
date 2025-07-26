import { useForm } from 'react-hook-form';
import {
  packingListSchema,
  PackingListFormFields,
  packingListDefaults,
} from '../../models/zod/packingListSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import privateRoutes from '../../routes/privateRoutes';
import { usePackingListMutations } from '../../hooks/usePackingListMutations';
import { useEffect } from 'react';

export default function PackingListForm({ userId }: { userId: string }) {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PackingListFormFields>({
    defaultValues: packingListDefaults,
    resolver: zodResolver(packingListSchema),
  });

  // Hooks to manage item CRUD
  const { createPackingList } = usePackingListMutations(userId);
  const navigate = useNavigate();

  async function onSubmit(data: PackingListFormFields) {
    const linkedData = { ...data, user: userId };
    console.log(linkedData);
    createPackingList.mutate(linkedData, {
      onSuccess: (data) => {
        console.log(data);
        navigate(privateRoutes.packingLists.details(data._id));
      },
    });
    reset();
  }

  // Hooks to dynamically update date values
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  useEffect(() => {
    if (new Date(endDate) < new Date(startDate)) {
      // Auto-update endDate to match startDate
      setValue('endDate', startDate);
    }
  }, [startDate, endDate, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="floating-label mb-2">
        <span>Packing List Name</span>
        <input
          {...register('name')}
          type="text"
          placeholder="Packing List Name"
          className="input w-70"
        />
        {errors.name && (
          <p className="text-error-content w-70">{errors.name.message}</p>
        )}
      </label>
      <label className="floating-label mb-2">
        <span>Start Date</span>
        <input
          {...register('startDate')}
          type="date"
          placeholder="Start Date"
          className="input w-70"
        />
        {errors.startDate && (
          <p className="text-error-content w-70">{errors.startDate.message}</p>
        )}
      </label>
      <label className="floating-label mb-2">
        <span>End Date</span>
        <input
          {...register('endDate')}
          type="date"
          min={watch('startDate')}
          placeholder="End Date"
          className="input w-70"
        />
        {errors.endDate && (
          <p className="text-error-content w-70">{errors.endDate.message}</p>
        )}
      </label>
      <label className="floating-label mb-2">
        <span>Destination</span>
        <input
          {...register('destination')}
          type="text"
          placeholder="Destination"
          className="input w-70"
        />
        {errors.destination && (
          <p className="text-error-content w-70">
            {errors.destination.message}
          </p>
        )}
      </label>
      <label className="floating-label mb-2">
        <span>Description</span>
        <input
          {...register('description')}
          type="text"
          placeholder="Description"
          className="input w-70"
        />
        {errors.description && (
          <p className="text-error-content w-70">
            {errors.description.message}
          </p>
        )}
      </label>
      <label className="floating-label mb-2">
        {errors.root && (
          <p className="text-error-content w-70">{errors.root.message}</p>
        )}
      </label>
      <div className="card-actions">
        <button
          disabled={isSubmitting}
          className="btn btn-accent"
          type="submit"
        >
          {isSubmitting ? 'Loading...' : 'Create Packing List'}
        </button>
      </div>
    </form>
  );
}
