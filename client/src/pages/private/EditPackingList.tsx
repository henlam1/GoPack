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
  const { updatePackingList } = usePackingListMutations();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // 1. Fetch the packing list by ID
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
      reset({
        ...data,
        startDate: formatDate(new Date(data.startDate)),
        endDate: formatDate(new Date(data.endDate)),
      });
    }
  }, [data, reset]);

  if (isLoading) return <p>Loading packing list...</p>;
  if (isError) return <p>Could not load packing list.</p>;

  const handleSubmit = methods.handleSubmit((formData) => {
    const transformedData = {
      ...formData,
      _id: data._id,
      user: data.user,
    };
    updatePackingList.mutate(
      {
        id: data._id,
        update: transformedData,
      },
      {
        onSuccess: () => {
          navigate(privateRoutes.home);
        },
        onError: (error) => {
          if (error instanceof APIError) {
            setError('root', { message: error.message });
          } else {
            setError('root', { message: 'Network error' });
          }
        },
      },
    );
  });

  const handleCancel = () => {
    methods.reset();
    navigate(privateRoutes.home);
  };

  return (
    <FormProvider {...methods}>
      <PackingListForm
        title="Edit Packing List"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </FormProvider>
  );
}
