'use client';
import CloseModalButton from '../buttons/CloseModalButton';

export default function ProjectDescriptionModal(props: ProjectDescriptionModalProps) {
  const { isOpen, onClose, data } = props;

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="relative w-full min-w-[40rem] max-w-sm rounded-lg bg-white pt-13 pr-8 pb-8 pl-6 shadow-lg z-[100]">
        <CloseModalButton onClick={handleClose} />
        <div className="relative flex flex-col items-start gap-5 text-grey-heading text-xl font-medium leading-[28px]">
          <h1>Project Description</h1>
          <p className="w-full max-w-full break-words text-sm">{data}</p>
        </div>
      </div>
    </div>
  );
}

interface ProjectDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: string;
}
