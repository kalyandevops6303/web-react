import { cn } from '@/flexternships/lib/utils';
import { X } from 'react-feather';

export default function GenericModal(props: GenericModalProps) {
  const { children, onClose, isOpen = false, className } = props;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
