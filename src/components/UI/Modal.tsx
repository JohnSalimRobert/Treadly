import type { ReactNode } from 'react';

interface ModalProps {
  header: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
}

export default function Modal({ header, body, footer, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div>{header}</div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4">{body}</div>

        {/* Footer */}
        {footer && <div className="p-4 border-t">{footer}</div>}
      </div>
    </div>
  );
}
