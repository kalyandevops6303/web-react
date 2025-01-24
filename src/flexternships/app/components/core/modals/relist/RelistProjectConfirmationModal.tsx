import { formatEpochToHumanReadable } from '@/flexternships/utils/date-utils';
import PrimaryButton from '../../buttons/PrimaryButton';
import GenericModal from '../GenericModal';
import GreenCheckGif from '@flexternships/assets/gifs/green-check.gif';
import { getUserTimezone } from '@/flexternships/utils/core-utils';

export default function RelistProjectConfirmationModal(props: RelistProjectConfirmationModalProps) {
  const { onClose, isOpen, onConfirm, startDate, project } = props;

  return (
    <GenericModal className="max-w-[650px]" isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-x-9 pl-6 pr-8 py-10">
        <div className="flex flex-col justify-center items-center">
          <img className="size-40" src={GreenCheckGif} alt="confirm-action" />
        </div>
        <div className="flex flex-col grow gap-y-6">
          <div className="flex flex-col gap-y-3">
            <div className="text-2xl font-medium text-grey-heading not-italic">Project Re-listed</div>
            <div className="text-lg text-grey font-normal leading-[29px]">
              Your project is now re-listed in the marketplace.
            </div>
            <div className="flex flex-col gap-y-2 text-lg leading-[29px]">
              <div className="">
                <span className="text-grey font-normal">Project Name: </span>
                <span className="text-grey-heading font-medium">{project.name} - clone</span>
              </div>
              {startDate && (
                <div>
                  <span className="text-grey font-normal">Start Date: </span>
                  <span className="text-grey-heading font-medium">
                    {formatEpochToHumanReadable(startDate, false, false, getUserTimezone())}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-end gap-x-5">
            <PrimaryButton className="m-0" onClick={onConfirm}>
              Done
            </PrimaryButton>
          </div>
        </div>
      </div>
    </GenericModal>
  );
}

interface RelistProjectConfirmationModalProps {
  onClose: () => void;
  isOpen?: boolean;
  onConfirm: () => void;
  startDate?: number;
  project: {
    name: string;
  };
}
