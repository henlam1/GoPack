import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import PackingListForm from '../../components/forms/PackingListForm';
import { usePackingListMutations } from '../../hooks/usePackingListMutations';
import {
  PackingListFormFields,
  packingListSchema,
} from '../../models/zod/packingListSchema';
import privateRoutes from '../../routes/privateRoutes';
import { APIError } from '../../services/errors/errorTypes';
import { getPackingListAPI } from '../../services/api/packingLists';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { formatDate } from '../../utils/stringHelpers';

export default function EditPackingListPage() {
  // Hooks to manage item CRUD
  const { createPackingList } = usePackingListMutations();
  const navigate = useNavigate();

  // 1. Fetch the packing list by ID
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['packingList', id],
    queryFn: () => getPackingListAPI(id!),
    enabled: !!id, // only run if id exists
  });

  // 2. Setup form with "empty defaults"
  const methods = useForm<PackingListFormFields>({
    defaultValues: {
      name: '',
      startDate: '',
      endDate: '',
      destination: '',
      description: '',
      status: '',
      categories: [],
    },
    resolver: zodResolver(packingListSchema),
  });
  const { setError, reset } = methods;

  // 3. Once data arrives, update the form with reset()
  React.useEffect(() => {
    if (data) {
      console.log(data);
      const transformedData = {
        ...data,
        startDate: formatDate(new Date(data.startDate)),
        endDate: formatDate(new Date(data.endDate)),
      };
      methods.reset(transformedData);
    }
  }, [data, methods]);

  if (isLoading) return <p>Loading packing list...</p>;
  if (isError) return <p>Could not load packing list.</p>;

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
    <div className="flex justify-center items-center">
      <div className="card card-border bg-primary w-96 shadow-lg">
        <div className="card-body items-center">
          <h2 className="card-title text-4xl font-bold mb-5 text-primary-content">
            Edit Packing List
          </h2>
          <FormProvider {...methods}>
            <PackingListForm onSubmit={handleSubmit} />
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
