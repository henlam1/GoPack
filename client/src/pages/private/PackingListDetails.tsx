import { useParams } from 'react-router-dom';
import CategoryContainer from '../../containers/CategoryContainer';
import { useQuery } from '@tanstack/react-query';
import { getPackingListAPI } from '../../services/api/packingLists';
import CategoryForm from '../../components/forms/CategoryForm';
import PLDetailsPageLayout from '../../components/layouts/PLDetailsPageLayout';
import AIPackingSuggestionsModal from '../../components/modals/AIPackingSuggestionModal';
import { useState } from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { SuggestionProvider } from '../../context/SuggestionProvider';
import Loading from '../../components/feedback/Loading';

export default function PackingListDetailsPage() {
  let { id } = useParams();
  id = id as string;
  const [open, setOpen] = useState(false);
  const {
    data: packingList,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['packingList', id],
    queryFn: () => getPackingListAPI(id),
  });
  if (isPending) return <Loading />;
  if (isError) return <div>Error...</div>;

  return (
    <PLDetailsPageLayout title={packingList.name}>
      <div className="flex flex-col w-8/12 mx-auto p-4 bg-base-300">
        <div className="flex justify-between mb-8">
          <div className="w-7/12">
            <CategoryForm packingListId={id} />
          </div>
          <button
            className="btn bg-gradient-to-r from-purple-500 to-cyan-500 w-4/12"
            onClick={() => setOpen(true)}
          >
            <SparklesIcon className="w-5 h-5 z-10" />
            AI Suggestions
          </button>
          <SuggestionProvider>
            <AIPackingSuggestionsModal
              isOpen={open}
              onClose={() => setOpen(false)}
              packingList={packingList}
            />
          </SuggestionProvider>
        </div>
        <CategoryContainer packingListId={id} />
      </div>
    </PLDetailsPageLayout>
  );
}
