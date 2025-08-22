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

export default function PackingListPage() {
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
        console.log(data);
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
    <div className="flex justify-center items-center">
      <div className="card card-border bg-primary w-96 shadow-lg">
        <div className="card-body items-center">
          <h2 className="card-title text-4xl font-bold mb-5 text-primary-content">
            Create Packing List
          </h2>
          <FormProvider {...methods}>
            <PackingListForm onSubmit={handleSubmit} />
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
