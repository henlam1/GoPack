import { useParams } from 'react-router-dom';
import CategoryContainer from '../../containers/CategoryContainer';
import { useQuery } from '@tanstack/react-query';
import { getPackingListAPI } from '../../services/api/packingLists';
import CategoryForm from '../../components/forms/CategoryForm';
import PLDetailsPageLayout from '../../components/layouts/PLDetailsPageLayout';

// THIS PAGE DISPLAYS THE RELEVANT DETAILS OF A PACKING LIST
// PACKING LIST NAME
// PACKING LIST CATEGORIES
// PACKING LIST CATEGORY ITEMS
export default function PackingListDetailsPage() {
  let { id } = useParams();
  id = id as string;

  const {
    data: packingList,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['packingList', id],
    queryFn: () => getPackingListAPI(id),
  });
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <PLDetailsPageLayout title={packingList.name}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-md mx-auto mb-6">
          <CategoryForm packingListId={id} />
        </div>
      </div>
      <CategoryContainer packingListId={id} />
    </PLDetailsPageLayout>
  );
}
