import CategoryContainer from '../../containers/CategoryContainer';
import CategoryForm from '../../components/forms/CategoryForm';
import PLDetailsPageLayout from '../../components/layouts/PLDetailsPageLayout';
import AIPackingSuggestionsModal from '../../components/modals/AIPackingSuggestionModal';
import { useState } from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { SuggestionProvider } from '../../context/SuggestionProvider';
import { PackingListProvider } from '../../context/PackingListProvider';

export default function PackingListDetailsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <PackingListProvider>
      <PLDetailsPageLayout>
        <div className="flex flex-col w-8/12 mx-auto p-4 bg-base-300 rounded-2xl">
          <div className="flex justify-between mb-10">
            <div className="w-7/12">
              <CategoryForm />
            </div>
            <button
              className="btn bg-gradient-to-r from-purple-500 to-cyan-500 w-4/12"
              onClick={() => setModalOpen(true)}
            >
              <SparklesIcon className="w-5 h-5 z-10" />
              AI Suggestions
            </button>
            <SuggestionProvider>
              <AIPackingSuggestionsModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
              />
            </SuggestionProvider>
          </div>
          <CategoryContainer />
        </div>
      </PLDetailsPageLayout>
    </PackingListProvider>
  );
}
