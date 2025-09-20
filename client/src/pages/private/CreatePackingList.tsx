import { useNavigate } from 'react-router-dom';
import PackingListForm from '../../components/forms/PackingListForm';
import { usePackingListMutations } from '../../hooks/usePackingListMutations';
import {
  packingListDefaults,
  PackingListFormFields,
  packingListSchema,
} from '../../models/zod/packingListSchema';
import privateRoutes from '../../routes/privateRoutes';
import { APIError } from '../../services/errors/errorTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

export default function CreatePackingListPage() {
  const methods = useForm<PackingListFormFields>({
    defaultValues: packingListDefaults,
    resolver: zodResolver(packingListSchema),
  });
  const { reset, setError } = methods;

  // Hooks to manage item CRUD
  const { createPackingList } = usePackingListMutations();
  const navigate = useNavigate();

  const handleSubmit = methods.handleSubmit((data) => {
    const transformedData = {
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    };
    createPackingList.mutate(transformedData, {
      onSuccess: (data) => {
        navigate(privateRoutes.packingLists.details(data._id));
        reset();
      },
      onError: (error) => {
        if (error instanceof APIError) {
          setError('root', { message: error.message });
        } else {
          setError('root', { message: 'Network error' });
        }
      },
    });
  });

  return (
    <FormProvider {...methods}>
      <PackingListForm title="Create Packing List" onSubmit={handleSubmit} />
    </FormProvider>
  );
}
