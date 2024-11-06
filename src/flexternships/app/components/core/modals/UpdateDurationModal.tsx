'use client';
import { useEffect, useState } from 'react';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import CloseModalButton from '../buttons/CloseModalButton';
import { useProjectCreationStore } from '@flexternships/stores/project-creation-store';
import { ModalType } from '@flexternships/types/project-creation-types';
import ChecklistAlarmGif from '@flexternships/assets/images/checklistAlarm.gif';

export default function UpdateDurationModal({ estimatedDuration, revisedEstimatedDuration, onConfirm }: Props) {
  const [durationDiff, setDurationDiff] = useState<boolean>(false); // true for undershot, false for overshot

  const isOpen = useProjectCreationStore((state) => state.isModalOpen);
  const curModal = useProjectCreationStore((state) => state.curModal);
  const closeModal = useProjectCreationStore((state) => state.closeModal);

  useEffect(() => {
    if (revisedEstimatedDuration < estimatedDuration) {
      setDurationDiff(true);
    } else {
      setDurationDiff(false);
    }
  }, [revisedEstimatedDuration, estimatedDuration]);

  if (!isOpen || (curModal !== ModalType.DURATION_UNDERSHOT && curModal !== ModalType.DURATION_OVERSHOT)) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="relative w-full min-w-[40rem] max-w-sm rounded-lg bg-white pt-13 pr-8 pb-8 pl-6  shadow-lg">
          <CloseModalButton onClick={closeModal} />
          <div className="flex">
            <div className="height-full mr-4 flex min-w-48 items-center justify-center">
              <img src={ChecklistAlarmGif} className=" w-full" width={100} height={100} alt="Checklist Alarm icon" />
            </div>
            <div>
              <h2 className=" text-2xl font-medium text-grey-heading">
                {durationDiff ? 'Duration Undershot' : 'Duration Exceeded'}
              </h2>
              <p className="mb-5 mt-2 text-lg text-grey">
                The estimated duration does not match the sum of the milestone duration. Would you like to revise the
                estimated duration?
              </p>
              <div className="grid w-full grid-cols-2 grid-rows-2 gap-x-4 gap-y-2">
                <div className="h-auto">
                  <span className=" text-xl font-medium text-grey-600 mr-3">{estimatedDuration} wk</span>
                  <span className={` text-sm ${durationDiff ? 'text-success' : 'text-error'}`}>
                    {durationDiff
                      ? `-${estimatedDuration - revisedEstimatedDuration}`
                      : `+${revisedEstimatedDuration - estimatedDuration}`}{' '}
                    wk
                  </span>
                </div>
                <div className="text-xl font-medium text-grey-600">{revisedEstimatedDuration} wk</div>
                <div className="text-grey-300 text-xs">Estimated Duration (in weeks)</div>
                <div className="text-grey-300 text-xs">Revised Estimated Duration (in weeks)</div>
              </div>
              <div className="mt-6 flex justify-end">
                <SecondaryButton onClick={closeModal} className=" mr-6">
                  Go Back
                </SecondaryButton>
                <PrimaryButton onClick={onConfirm}>Update Duration</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type Props = {
  onConfirm: () => void;
  estimatedDuration: number;
  revisedEstimatedDuration: number;
};
