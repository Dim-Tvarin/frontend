import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { IoIosCloseCircleOutline } from 'react-icons/io';

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  title?: string;
};

const Modal = ({ children, onClose, title }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-dialog rounded-4xl shadow-lg p-32">
        <div className="flex items-center justify-between mb-20">
          <h2 className="text-xl font-medium text-default-btn">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
            aria-label="Закрити"
          >
            <IoIosCloseCircleOutline size={32} />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-auto">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
