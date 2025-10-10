import { IPackingList } from '../../models/PackingListModel';
import { useState } from 'react';
import Loading from '../feedback/Loading';
import CategorySuggestionForm from '../forms/CategorySuggestionForm';
import { AISuggestionsView } from '../data/AISuggestionsView';
import CloseButton from '../buttons/CloseButton';
import BackButton from '../buttons/BackButton';
import { useSuggestionContext } from '../../hooks/useSuggestion';

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
  const [moreOptionsChecked, setMoreOptionsChecked] = useState(false);
  const { setSuggestions } = useSuggestionContext();

  // Form reset functions
  function handleClose() {
    onClose();
    setTimeout(resetModal, 200); // Reset form after it fades
  }

  function resetModal() {
    setStep('form');
    setMoreOptionsChecked(false);
    setSuggestions({});
  }

  const stepActionsMap = {
    form: [<CloseButton onClick={handleClose} />],
    loading: [<CloseButton onClick={handleClose} />],
    results: [
      <BackButton onClick={resetModal} />,
      <CloseButton onClick={handleClose} />,
    ],
  };

  return (
    <dialog id="ai_suggestions_modal" className="modal" open={isOpen}>
      <div className="modal-box max-w-2xl w-full max-h-[85vh] h-[500px] flex flex-col overflow-y-auto">
        {/* Modal Actions */}
        <div
          className={`flex justify-${stepActionsMap[step].length === 1 ? 'end' : 'between'}`}
        >
          {stepActionsMap[step].map((button) => button)}
        </div>

        {/* Title */}
        <h3 className="font-bold text-xl my-4">AI Packing Suggestions</h3>

        {/* Modal Content */}
        {step === 'form' && (
          <CategorySuggestionForm
            packingList={packingList}
            moreOptionsChecked={moreOptionsChecked}
            setMoreOptionsChecked={setMoreOptionsChecked}
            setStep={setStep}
          />
        )}
        {step === 'loading' && <Loading />}
        {step === 'results' && <AISuggestionsView handleClose={handleClose} />}
      </div>
    </dialog>
  );
}
