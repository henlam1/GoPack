import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput } from './FormInput';

interface PackingListFormProps {
  title: string;
  onSubmit: () => void;
}

export default function PackingListForm({
  title,
  onSubmit,
}: PackingListFormProps) {
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
    <div className="flex min-h-screen items-center justify-center bg-base-300">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <form
            onSubmit={onSubmit}
            className="card p-6 bg-base-100 max-w-md mx-auto"
          >
            <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
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
              <p className="text-error text-center mb-2">
                {errors.root.message}
              </p>
            )}

            <button
              disabled={isSubmitting}
              className="btn btn-accent mt-6"
              type="submit"
            >
              {isSubmitting ? 'Loading...' : title}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
