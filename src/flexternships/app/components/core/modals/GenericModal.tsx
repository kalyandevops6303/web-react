import { X } from 'react-feather';

export default function GenericModal(props: GenericModalProps) {
  const { children, onClose, isOpen = false } = props;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl relative">
        <div className="absolute -top-2 -right-2 bg-white rounded-md p-2 shadow-table cursor-pointer" onClick={onClose}>
          <X size={16} />
        </div>
        {children}
      </div>
    </div>
  );
}

type GenericModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  isOpen?: boolean;
};
