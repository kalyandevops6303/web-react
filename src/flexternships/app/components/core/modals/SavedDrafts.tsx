'use client';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import CloseModalButton from '../buttons/CloseModalButton';
import { useProjectCreationStore } from '@flexternships/stores/project-creation-store';
import { ModalType } from '@flexternships/types/project-creation-types';
import ChecklistGif from '@flexternships/assets/gifs/checklist.gif';
import { useNavigate } from 'react-router-dom';
import routes from '@/flexternships/routes';

export default function SavedDrafts(props: Props) {
  const isOpen = useProjectCreationStore((state) => state.isModalOpen);
  const curModal = useProjectCreationStore((state) => state.curModal);
  const closeModal = useProjectCreationStore((state) => state.closeModal);
  const resetProjectCreationStore = useProjectCreationStore((state) => state.resetStore);

  const navigate = useNavigate();

  if (!isOpen || curModal !== ModalType.DRAFT_SAVED) {
    return null;
  }

  const handleClose = () => {
    closeModal();
    navigate(routes.dashboard.path);
    resetProjectCreationStore();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="relative w-full min-w-[41.7rem] max-w-sm rounded-lg bg-white pt-13 pr-8 pb-8 pl-10 shadow-lg">
        <CloseModalButton onClick={handleClose} />
        <div className="flex">
          <div className="height-full mr-10 flex w-30 min-w-30 items-center justify-center">
            {/* Icon can be replaced with an actual icon */}
            <img src={ChecklistGif} className=" w-full" width={100} height={100} alt="Draft Saved icon" />
          </div>
          <div>
            <h2 className=" text-2xl font-medium text-grey-heading">Draft Saved</h2>
            <p className="mb-4 mt-2 text-lg text-grey">
              We've saved your work as a draft. Feel free to return when you're ready to complete it.
            </p>
            <p className=" text-base text-grey">
              <span className="font-semibold">Note:</span> To find your drafts please go to,
            </p>
            <p className=" text-base font-semibold text-grey">Marketplace &gt; My Listings &gt; Drafts Or View Draft</p>
            <div className="mt-12 flex justify-end">
              <SecondaryButton onClick={handleClose} className=" mr-6">
                Close
              </SecondaryButton>
              <PrimaryButton onClick={props.onConfirm}>View Drafts</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  onConfirm: () => void;
};
