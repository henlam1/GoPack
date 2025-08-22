import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

interface PackingListFormProps {
  onSubmit: () => void;
}

export default function PackingListForm({ onSubmit }: PackingListFormProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormContext();

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
    <form onSubmit={onSubmit}>
      <label className="floating-label mb-2">
        <span>Packing List Name</span>
        <input
          {...register('name')}
          type="text"
          placeholder="Packing List Name"
          className="input w-70"
        />
        {errors.name && (
          <p className="text-error-content w-70">
            {errors.name.message as string}
          </p>
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
          <p className="text-error-content w-70">
            {errors.startDate.message as string}
          </p>
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
          <p className="text-error-content w-70">
            {errors.endDate.message as string}
          </p>
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
            {errors.destination.message as string}
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
            {errors.description.message as string}
          </p>
        )}
      </label>
      <label className="floating-label mb-2">
        {errors.root && (
          <p className="text-error-content w-70">
            {errors.root.message as string}
          </p>
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
