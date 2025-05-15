'use client';

import { useEffect, useRef } from 'react';

import { HiX } from 'react-icons/hi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  width?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, width, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);

      // 모달이 열릴 때 body 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);

      // 모달이 닫힐 때 body 스크롤 복원
      if (isOpen) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden no-scrollbar"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="fixed inset-0 bg-black/70 transition-opacity" aria-hidden="true"></div>

      <div className={`relative z-50 max-w-6xl p-4 mx-auto ${width ? width : 'w-full'}`}>
        <div
          ref={modalRef}
          className="relative bg-white rounded-md shadow-xl max-h-[80vh] overflow-y-auto no-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          data-modal-container="true"
        >
          <div className="flex items-center justify-between p-6">
            <h3 id="modal-title" className="text-xl font-semibold text-gray-900 p-1.5">
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 inline-flex items-center justify-center cursor-pointer"
              aria-label="닫기"
            >
              <HiX className="w-5 h-5 cursor-pointer" aria-hidden="true" />
            </button>
          </div>

          <div className="px-7 pb-7">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
