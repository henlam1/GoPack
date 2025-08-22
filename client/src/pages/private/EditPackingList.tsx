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

export default function EditPackingListPage() {
  let { id } = useParams();
  id = id as string;

  // Hooks to manage item CRUD
  const { readPackingList, createPackingList } = usePackingListMutations();
  const navigate = useNavigate();

  let packingList;
  readPackingList.mutate(id, {
    onSuccess: (data) => {
      packingList = data;
    },
    onError: (error) => {
      console.log(error);
      navigate(privateRoutes.home);
    },
  });

  const methods = useForm<PackingListFormFields>({
    defaultValues: packingList,
    resolver: zodResolver(packingListSchema),
  });
  const { reset, setError } = methods;

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
