import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import {
  AISuggestionFormFields,
  AISuggestionDefaults,
  AISuggestionSchema,
} from '../../models/zod/AISuggestionSchema';
import { suggestCategoriesAPI } from '../../services/api/categories';
import { APIError } from '../../services/errors/errorTypes';
import { ISODateDifference } from '../../utils/stringHelpers';
import { DropdownSelect } from '../inputs/DropdownSelect';
import { TextAreaInput, FormInput } from '../inputs/FormInput';
import { IPackingList } from '../../models/PackingListModel';

const presetCategories = [
  'Essentials',
  'Clothing',
  'Toiletries',
  'Electronics',
  'Outdoor Gear',
  'Leisure',
  'Fitness',
  'Snacks',
  'Work',
  'Health',
];

interface CategorySuggestionFormProps {
  packingList: IPackingList;
  moreOptionsChecked: boolean;
  setMoreOptionsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setStep: React.Dispatch<React.SetStateAction<'form' | 'loading' | 'results'>>;
  setSuggestions: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
}

export default function CategorySuggestionForm({
  packingList,
  moreOptionsChecked,
  setMoreOptionsChecked,
  setStep,
  setSuggestions,
}: CategorySuggestionFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<AISuggestionFormFields>({
    defaultValues: AISuggestionDefaults(
      packingList.destination,
      ISODateDifference(packingList.startDate, packingList.endDate),
    ),
    resolver: zodResolver(AISuggestionSchema),
  });

  const { mutate } = useMutation({
    mutationFn: suggestCategoriesAPI,
    onSuccess: (data) => {
      console.log('Suggest category mutation successful', data);
      setSuggestions(data);
      setStep('results');
    },
    onError: (error) => {
      if (error instanceof APIError) {
        setError('root', { message: 'API Error' });
      } else {
        setError('root', { message: 'Network error' });
      }
    },
  });

  async function onSubmit(data: AISuggestionFormFields) {
    setStep('loading');
    reset();
    setMoreOptionsChecked(false);
    mutate(data);
  }

  const handleToggleChecked = () => {
    setMoreOptionsChecked(!moreOptionsChecked);
  };

  function PageOne() {
    return (
      <>
        <TextAreaInput
          label="Description"
          placeholder="Describe your trip details. E.g. '10 days in Japan, sightseeing and hiking'"
          {...register('description')}
          error={errors.description?.message}
          maxLength={300}
        />

        {/* Two-column row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Destination"
            placeholder="destination"
            {...register('destination')}
            error={errors.destination?.message}
            maxLength={85}
          />

          <FormInput
            label="Duration"
            type="number"
            placeholder="duration"
            min={'1'}
            {...register('duration')}
            error={errors.duration?.message}
          />
        </div>
      </>
    );
  }

  function PageTwo() {
    // DropdownSelect is a custom component
    // Controller manages my custom component's state
    return (
      <Controller
        name="categories"
        control={control}
        render={({ field }) => (
          <DropdownSelect
            label="Categories"
            options={presetCategories}
            value={field.value} // pass value
            onChange={field.onChange} // pass onChange>
            error={errors.categories?.message}
          />
        )}
      />
    );
  }
  return (
    <>
      <form
        id="categorySuggestionForm"
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 flex flex-col gap-6 pr-1"
      >
        {/* Pages */}
        {!moreOptionsChecked ? <PageOne /> : <PageTwo />}

        {/* Error */}
        {errors.root && (
          <p className="text-error text-center">{errors.root.message}</p>
        )}
      </form>
      {/* Navigation Buttons pinned at bottom */}
      <div className="modal-action flex-col gap-4 items-end justify-end mt-4">
        <div className="flex flex-row gap-4">
          <p className="text-gray-400">Other Options</p>
          <input
            type="checkbox"
            className="toggle"
            checked={moreOptionsChecked}
            onChange={handleToggleChecked}
          />
        </div>
        <button
          form="categorySuggestionForm"
          disabled={isSubmitting}
          className="btn btn-accent w-full"
          type="submit"
        >
          {isSubmitting ? 'Generating...' : 'Generate Suggestions'}
        </button>
      </div>
    </>
  );
}
