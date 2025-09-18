import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput } from './FormInput';

interface PackingListFormProps {
  onSubmit: () => void;
  mode?: string;
}

export default function PackingListForm({
  onSubmit,
  mode = 'creating',
}: PackingListFormProps) {
  const buttonText =
    mode === 'editing' ? 'Edit Packing List' : 'Create Packing List';
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
      <FormInput
        label="Packing List Name"
        placeholder="packing list name"
        {...register('name')}
        error={errors.name?.message as string}
      />

      <FormInput
        type="date"
        label="Start Date"
        placeholder="start date"
        {...register('startDate')}
        error={errors.startDate?.message as string}
      />

      <FormInput
        type="date"
        label="End Date"
        placeholder="end date"
        {...register('endDate')}
        error={errors.endDate?.message as string}
      />

      <FormInput
        label="Destination"
        placeholder="destination"
        {...register('destination')}
        error={errors.destination?.message as string}
      />

      <FormInput
        label="Description"
        placeholder="description"
        {...register('description')}
        error={errors.description?.message as string}
      />

      {errors.root && (
        <p className="text-error text-center mb-2">{errors.root.message}</p>
      )}

      <div className="card-actions">
        <button
          disabled={isSubmitting}
          className="btn btn-accent"
          type="submit"
        >
          {isSubmitting ? 'Loading...' : buttonText}
        </button>
      </div>
    </form>
  );
}
