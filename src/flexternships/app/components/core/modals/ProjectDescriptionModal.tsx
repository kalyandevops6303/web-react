'use client';
import GenericModal from './GenericModal';

export default function ProjectDescriptionModal(props: ProjectDescriptionModalProps) {
  const { isOpen, onClose, data } = props;

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <GenericModal className="pb-5 max-h-[70vh]" isOpen={isOpen} onClose={handleClose}>
      <h1 className="text-grey-heading text-xl font-medium leading-[28px] pt-5 pr-8 pb-3 pl-6">Project Description</h1>
      <div className="overflow-y-auto px-6 text-sm text-gray-800 max-h-[60vh]">
        <p className="w-full max-w-full break-words pb-10">{data}</p>
      </div>
    </GenericModal>
  );
}

interface ProjectDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: string;
  modalRef: React.RefObject<HTMLDivElement>;
}
