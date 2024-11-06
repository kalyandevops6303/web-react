'use client';
import { useState } from 'react';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import CloseModalButton from '../buttons/CloseModalButton';
import ChecklistGif from '@flexternships/assets/images/checklist.gif';

export default function DraftAvailable() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const hideModal = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="relative w-full min-w-[40rem] max-w-sm rounded-lg pt-13 pr-8 pb-8 pl-6  bg-white shadow-lg">
        <CloseModalButton onClick={hideModal} />
        <div className="flex">
          <div className="height-full mr-[0.88rem] flex min-w-48 w-48 items-center justify-center">
            {/* Icon can be replaced with an actual icon */}
            <img src={ChecklistGif} className=" w-full" width={100} height={100} alt="Drafts available icon" />
          </div>
          <div>
            <h2 className=" text-2xl font-medium text-grey-heading">Saved Drafts Available</h2>
            <p className="mb-4 mt-4 text-lg text-grey">
              You have project(s) in draft mode. Would you like to continue where you left off?
            </p>
            <div className=" mt-17 flex justify-end">
              <SecondaryButton onClick={hideModal} className=" mr-6">
                Create New Project
              </SecondaryButton>
              <PrimaryButton onClick={hideModal}>View Drafts</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
