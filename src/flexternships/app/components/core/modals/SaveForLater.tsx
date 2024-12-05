'use client';
import { useState } from 'react';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import CloseModalButton from '../buttons/CloseModalButton';
import SavedGif from '@flexternships/assets/images/saved.gif';
import { useProjectCreationStore } from '@flexternships/stores/project-creation-store';
import { ModalType } from '@flexternships/types/project-creation-types';
import { showToastMessage } from '@flexternships/utils/core-utils';
import { ToastType } from '@flexternships/enums/core-enums';
import Toast from '../Toasts/Toast';

export default function SaveForLater(props: Props) {
  const { onCancel } = props;
  const [isSaving, setIsSaving] = useState(false);
  const isOpen = useProjectCreationStore((state) => state.isModalOpen);
  const curModal = useProjectCreationStore((state) => state.curModal);
  const closeModal = useProjectCreationStore((state) => state.closeModal);
  const saveDraft = useProjectCreationStore((state) => state.saveDraft);

  if (!isOpen || curModal !== ModalType.SAVE_FOR_LATER) {
    return null;
  }

  const handleSaveAsDraft = async () => {
    setIsSaving(true);
    try {
      await saveDraft();
      showToastMessage(ToastType.SUCCESS, <Toast type={ToastType.SUCCESS} description="Draft saved successfully" />);
    } catch (error) {
      showToastMessage(
        ToastType.ERROR,
        <Toast type={ToastType.ERROR} description="Failed to save draft. Please try again." />,
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="relative w-full min-w-[40rem] max-w-sm rounded-lg bg-white pt-13 pr-8 pb-8 pl-6  shadow-lg">
        <CloseModalButton onClick={closeModal} />
        <div className="flex">
          <div className="height-full mr-[1.44rem] flex min-w-48 w-48 items-center justify-center">
            <img src={SavedGif} className=" w-full" width={100} height={100} alt="Save for later icon" />
          </div>
          <div>
            <h2 className=" text-2xl font-medium text-grey-heading">Save For Later</h2>
            <p className="mt-2 text-lg text-grey">You have unsaved work. Do you want to save it as a draft?</p>
            <div className="mt-17 flex justify-end">
              <SecondaryButton onClick={onCancel} cancel={true} className=" mr-6" disabled={isSaving}>
                Discard
              </SecondaryButton>
              <PrimaryButton onClick={handleSaveAsDraft} loading={isSaving}>
                Save as Draft
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  onCancel: () => void;
};
