import PrimaryButton from '../../buttons/PrimaryButton';
import GenericModal from '../GenericModal';
import DangerGif from '@flexternships/assets/gifs/danger.gif';
import { useState } from 'react';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { showToastMessage } from '@/flexternships/utils/core-utils';

export default function WithdrawProjectModal(props: WithdrawProjectModalProps) {
  const { onClose, isOpen, project, initiateRelist } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);

  const withdrawProject = async () => {
    setIsConfirmLoading(true);
    try {
      // TODO: Implement withdraw project
    } catch (error) {
      showToastMessage(
        ToastType.ERROR,
        error instanceof Error ? error.message : 'An unexpected error occurred while withdrawing from project',
      );
    } finally {
      setIsConfirmLoading(false);
    }
  };

  return (
    <GenericModal className="max-w-[790px]" isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-x-10 pl-6 pr-8 py-10">
        <div className="flex flex-col justify-center items-center">
          <img className="w-36 h-36" src={DangerGif} alt="confirm-action" />
        </div>
        <div className="flex flex-col grow gap-y-8">
          <div className="flex flex-col gap-y-5">
            <h1 className="text-2xl font-medium leading-[38px] text-error">Withdraw Project</h1>
            <div className="flex flex-col gap-y-4">
              <div className="text-lg font-medium text-grey-heading not-italic">
                Are you sure you want to withdraw this project?
              </div>
              <ol className="pl-5 list-decimal text-lg text-grey font-normal leading-[26px]">
                <li>This project will be delisted from marketplace.</li>
                <li>Talent won’t be able to join this project.</li>
                <li>You can relist this project with new project start date.</li>
              </ol>
            </div>
            <div className="flex flex-col gap-y-1">
              <div className="text-grey-heading text-xl font-medium leading-6">{project.name}</div>
              <div className="text-grey-muted text-sm font-normal leading-4.5">Project Name</div>
            </div>
          </div>
          <div className="flex flex-row justify-end gap-x-5">
            <PrimaryButton className="m-0" onClick={initiateRelist}>
              Relist
            </PrimaryButton>
            <PrimaryButton cancel className="m-0" onClick={withdrawProject} loading={isConfirmLoading}>
              Withdraw
            </PrimaryButton>
          </div>
        </div>
      </div>
    </GenericModal>
  );
}

interface WithdrawProjectModalProps {
  onClose: () => void;
  isOpen?: boolean;
  project: {
    id: string;
    name: string;
  };
  initiateRelist: () => void;
}
