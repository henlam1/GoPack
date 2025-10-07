import { IPackingList } from '../../models/PackingListModel';
import { useState } from 'react';
import Loading from '../feedback/Loading';
import CategorySuggestionForm from '../forms/CategorySuggestionForm';
import { AISuggestionsView } from '../data/AISuggestionsView';

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
  const [step, setStep] = useState<'form' | 'loading' | 'results'>('form');
  const [suggestions, setSuggestions] = useState<Record<string, string[]>>({
    Suggestions: ['None'],
  });

  // Form reset functions
  function handleClose() {
    onClose();
    resetModal();
  }

  function resetModal() {
    setStep('form');
    setSuggestions({ Suggestions: ['None'] });
  }

  return (
    <dialog id="ai_suggestions_modal" className="modal" open={isOpen}>
      <div className="modal-box max-w-2xl w-full max-h-[85vh] h-[500px] flex flex-col">
        {/* Close Button */}
        <div className="flex justify-end">
          <button className="btn btn-sm btn-circle" onClick={handleClose}>
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <h3 className="font-bold text-xl mb-4">AI Packing Suggestions</h3>

        {step === 'form' && (
          <CategorySuggestionForm
            packingList={packingList}
            setStep={setStep}
            setSuggestions={setSuggestions}
          />
        )}
        {step === 'loading' && <Loading />}
        {step === 'results' && <AISuggestionsView suggestions={suggestions} />}
      </div>
    </dialog>
  );
}
