'use client';
import CloseModalButton from '../buttons/CloseModalButton';

export default function ProjectDescriptionModal(props: ProjectDescriptionModalProps) {
  const { isOpen, onClose, data, modalRef } = props;

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-20">
      <div
        className="relative w-full min-w-[40rem] max-w-sm rounded-lg bg-white shadow-lg  max-h-[80vh] "
        ref={modalRef}
      >
        <CloseModalButton onClick={handleClose} />
        <h1 className="text-grey-heading text-xl font-medium leading-[28px] pt-5 pr-8 pb-3 pl-6">
          Project Description
        </h1>
        <div className="overflow-y-auto px-6  text-sm text-gray-800 max-h-[70vh]">
          <p className="w-full max-w-full break-words pb-6">{data}</p>
        </div>
      </div>
    </div>
  );
}

interface ProjectDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: string;
  modalRef: React.RefObject<HTMLDivElement>;
}
