import { XMarkIcon } from '@heroicons/react/24/outline';
import { IPackingList } from '../../models/PackingListModel';
import {
  AISuggestionSchema,
  AISuggestionFormFields,
  AISuggestionDefaults,
} from '../../models/zod/AISuggestionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormInput, TextAreaInput } from '../inputs/FormInput';
import { ISODateDifference } from '../../utils/stringHelpers';
import { DropdownSelect } from '../inputs/DropdownSelect';
import { useState } from 'react';

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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  packingList: IPackingList;
}

export default function AIPackingSuggestionsModal({
  isOpen,
  onClose,
  packingList,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // setError,
  } = useForm<AISuggestionFormFields>({
    defaultValues: AISuggestionDefaults(
      packingList.destination,
      ISODateDifference(packingList.startDate, packingList.endDate),
    ),
    resolver: zodResolver(AISuggestionSchema),
  });

  const [isChecked, setIsChecked] = useState(false);

  // const navigate = useNavigate();
  // const { mutate } = useMutation({
  //   mutationFn: registerAPI,
  //   onSuccess: () => {},
  //   onError: (error) => {
  //     if (error instanceof APIError) {
  //       setError('root', { message: 'Invalid username or email' });
  //     } else {
  //       setError('root', { message: 'Network error' });
  //     }
  //   },
  // });

  async function onSubmit(data: AISuggestionFormFields) {
    console.log(data);
  }

  const handleToggleChecked = () => {
    setIsChecked(!isChecked);
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
            {...register('duration')}
            error={errors.duration?.message}
          />
        </div>
      </>
    );
  }

  function PageTwo() {
    return (
      <>
        {/* Category Dropdown */}
        <DropdownSelect label="Categories" options={presetCategories} />
      </>
    );
  }

  return (
    <dialog id="ai_suggestions_modal" className="modal" open={isOpen}>
      <div className="modal-box max-w-2xl w-full max-h-[85vh] h-[500px] flex flex-col">
        {/* Close Button */}
        <div className="flex justify-end">
          <button className="btn btn-sm btn-circle" onClick={onClose}>
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <h3 className="font-bold text-xl mb-4">AI Packing Suggestions</h3>

        {/* Scrollable Form */}
        <form
          id="ai_category_suggestions_form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col gap-6 pr-1"
        >
          {/* Pages */}
          {!isChecked ? <PageOne /> : <PageTwo />}

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
              checked={isChecked}
              onChange={handleToggleChecked}
            />
          </div>
          <button
            form="ai_category_suggestions_form"
            disabled={isSubmitting}
            className="btn btn-accent w-full"
            type="submit"
          >
            {isSubmitting ? 'Generating...' : 'Generate Suggestions'}
          </button>
        </div>
      </div>
    </dialog>
  );
}
