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
    <GenericModal className="pb-5 max-h-[70vh] max-w-[70vw] md:max-w-[50vw]" isOpen={isOpen} onClose={handleClose}>
      <div className="max-w-[70vw] md:max-w-[50vw]">
        <h1 className="text-grey-heading text-xl font-medium leading-[28px] pt-5 pr-8 pb-3 pl-6">
          Project Description
        </h1>
        <div className="overflow-y-auto px-6 text-sm text-gray-800 max-h-[60vh]">
          <p className=" break-words pb-10">{data}</p>
        </div>
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
