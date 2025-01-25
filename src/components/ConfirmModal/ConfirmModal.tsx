import React, { useEffect, useState } from 'react';
import './ConfirmModal.scss';

interface ConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  show,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // Match the transition duration
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <>
      {isVisible && <div className={`modal-backdrop ${show ? 'show' : ''}`}></div>}
      {isVisible && (
      <div className={`modal ${show ? 'show' : ''}`} tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>{message}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                  {cancelText}
                </button>
                <button type="button" className="btn btn-outline-danger" onClick={onConfirm}>
                  {confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;