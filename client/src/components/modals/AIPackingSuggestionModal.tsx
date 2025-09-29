interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIPackingSuggestionsModal({ isOpen, onClose }: Props) {
  return (
    <dialog id="ai_suggestions_modal" className="modal" open={isOpen}>
      <div className="modal-box h-10/12 my-auto">
        <h3 className="font-bold text-lg">AI Packing Suggestions</h3>
        <p>Form and suggestions go here...</p>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
