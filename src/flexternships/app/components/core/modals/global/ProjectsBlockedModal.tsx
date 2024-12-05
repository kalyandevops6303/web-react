import { useAppStore } from '@/flexternships/stores/core-stores';
import PrimaryButton from '../../buttons/PrimaryButton';
import GenericModal from '../GenericModal';
import BlockedGif from '@flexternships/assets/gifs/blocked.gif';
import { GlobalModalType } from '@/flexternships/constraints/enums/core-enums';
import { isEmpty } from 'lodash';
import { useState } from 'react';

export default function ProjectsBlockedModal() {
  const modal = useAppStore((state) => state.modal);
  const modalContent = useAppStore((state) => state.modalContent);
  const modalActions = useAppStore((state) => state.modalActions);

  const [isConfirmLoading, setIsConfirmLoading] = useState(false);

  if (isEmpty(modalContent) || isEmpty(modalActions)) return null;

  const handleConfirm = async () => {
    setIsConfirmLoading(true);
    try {
      await modalActions.onConfirm();
    } finally {
      setIsConfirmLoading(false);
    }
  };

  return (
    <GenericModal isOpen={modal === GlobalModalType.PROJECTS_BLOCKED} onClose={modalActions.onClose}>
      <div className="flex gap-x-12 pl-9 pr-8 py-10">
        <div className="flex flex-col justify-center items-center">
          <img className="w-36 h-36 object-cover" src={BlockedGif} alt="blocked-gif" />
        </div>
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-4 max-w-[415px]">
            <h1 className="text-2xl font-medium text-grey-heading">{modalContent.title}</h1>
            {modalContent.description && (
              <div className="text-lg font-normal leading-6 text-grey">{modalContent.description}</div>
            )}
          </div>
          <div className="flex flex-row justify-end gap-x-5">
            <PrimaryButton className="m-0" onClick={handleConfirm} loading={isConfirmLoading}>
              {modalContent.confirmButtonText}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </GenericModal>
  );
}
