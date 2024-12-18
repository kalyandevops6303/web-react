import { useAppStore } from '@/flexternships/stores/core-stores';
import PrimaryButton from '../../buttons/PrimaryButton';
import SecondaryButton from '../../buttons/SecondaryButton';
import GenericModal from '../GenericModal';
import SaveForLaterGif from '@flexternships/assets/gifs/save-for-later.gif';
import { GlobalModalType } from '@/flexternships/constraints/enums/core-enums';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UnsavedWorkModal() {
  const modal = useAppStore((state) => state.modal);
  const modalContent = useAppStore((state) => state.modalContent);
  const modalActions = useAppStore((state) => state.modalActions);
  const unsetWip = useAppStore((state) => state.unsetWip);

  const [isConfirmLoading, setIsConfirmLoading] = useState(false);

  const navigate = useNavigate();

  if (isEmpty(modalContent) || isEmpty(modalActions)) return null;

  const handleConfirm = async () => {
    setIsConfirmLoading(true);
    try {
      await modalActions.onConfirm();
      unsetWip();
    } finally {
      setIsConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    if (modalContent?.metadata?.nextPath !== undefined) {
      navigate(modalContent.metadata.nextPath);
    }
    modalActions.onCancel();
  };

  return (
    <GenericModal isOpen={modal === GlobalModalType.UNSAVED_WORK} onClose={modalActions.onClose}>
      <div className="flex gap-x-6 pl-6 pr-8 pt-10 pb-6">
        <div className="flex flex-col justify-center items-center">
          <img className="w-44 h-44 object-cover" src={SaveForLaterGif} alt="save-for-later-gif" />
        </div>
        <div className="flex flex-col gap-y-11">
          <div className="flex flex-col gap-y-4 max-w-[415px]">
            <h1 className="text-2xl font-medium text-grey-heading">{modalContent.title}</h1>
            {modalContent.description && (
              <div className="text-lg font-normal leading-6 text-grey">{modalContent.description}</div>
            )}
          </div>
          <div className="flex flex-row justify-end gap-x-5">
            <SecondaryButton className="m-0 outline-none" onClick={handleCancel} cancel>
              {modalContent.cancelButtonText}
            </SecondaryButton>
            <PrimaryButton className="m-0" onClick={handleConfirm} loading={isConfirmLoading}>
              {modalContent.confirmButtonText}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </GenericModal>
  );
}
