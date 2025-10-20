interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ModalProps) {
  return (
    <dialog
      className="modal"
      role="dialog"
      id="confirm_delete_PL_modal"
      open={isOpen}
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action flex">
          <button className="btn btn-accent" onClick={() => onClose()}>
            Close
          </button>
          <button className="btn btn-secondary" onClick={() => onConfirm()}>
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
}
