import { cn } from '@/flexternships/lib/utils';
import { X } from 'react-feather';
import { useEffect } from 'react';

export default function GenericModal(props: GenericModalProps) {
  const { children, onClose, isOpen = false, className } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={cn('bg-white rounded-lg max-w-2xl relative', className)}>
        <div
          className="absolute -top-2 -right-2 bg-white rounded-md p-2 shadow-table cursor-pointer z-10"
          onClick={onClose}
        >
          <X size={16} />
        </div>
        {children}
      </div>
    </div>
  );
}

type GenericModalProps = {
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
  isOpen?: boolean;
};
