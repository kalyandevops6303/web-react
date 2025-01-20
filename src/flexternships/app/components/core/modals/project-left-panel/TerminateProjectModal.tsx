import PrimaryButton from '../../buttons/PrimaryButton';
import SecondaryButton from '../../buttons/SecondaryButton';
import GenericModal from '../GenericModal';
import DangerGif from '@flexternships/assets/gifs/danger.gif';
import { useState } from 'react';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { showToastMessage } from '@/flexternships/utils/core-utils';

const TerminateWithRelistBody = () => {
  return (
    <div className="flex flex-col gap-y-4 text-grey">
      <div className="text-lg font-medium leading-5.5 not-italic">Don't want to continue with the project?</div>
      <div className="text-base font-normal leading-5">
        <span className="text-base font-bold leading-5">Delete: </span> Deleting the project will remove this project
        from the platform.
      </div>
      <div className="text-base font-normal leading-5">
        <span className="text-base font-bold leading-5">Relist Project: </span> Relisting the project will terminate the
        contract with the existing team/talent & list this project back in marketplace.
      </div>
    </div>
  );
};

const TerminateWithoutRelistBody = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-lg font-medium leading-5.5 text-grey not-italic">
        This action can not be undone. Are you sure you would want to terminate the project?
      </div>
    </div>
  );
};

export default function TerminateProjectModal(props: TerminateProjectModalProps) {
  const { onClose, isOpen, onConfirm, withRelist, onCancel, project } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);

  const handleConfirm = async () => {
    setIsConfirmLoading(true);
    try {
      await onConfirm();
    } catch (error) {
      showToastMessage(
        ToastType.ERROR,
        error instanceof Error ? error.message : 'An unexpected error occurred while terminating project',
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
        <div className="flex flex-col grow gap-y-9">
          <div className="flex flex-col gap-y-4">
            <h1 className="text-2xl font-medium leading-[38px] text-error">Project Termination</h1>
            {withRelist ? <TerminateWithRelistBody /> : <TerminateWithoutRelistBody />}
            <div className="flex flex-col gap-y-1">
              <div className="text-grey-heading text-xl font-medium leading-6">{project.name}</div>
              <div className="text-grey-muted text-sm font-normal leading-4.5">Project Name</div>
            </div>
          </div>
          <div className="flex flex-row justify-end gap-x-5">
            <SecondaryButton cancel={withRelist} className="m-0" onClick={onCancel}>
              {withRelist ? 'Delete' : 'Cancel'}
            </SecondaryButton>
            <PrimaryButton cancel className="m-0" onClick={handleConfirm} loading={isConfirmLoading}>
              {withRelist ? 'Relist Project' : 'Terminate Project'}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </GenericModal>
  );
}

interface TerminateProjectModalProps {
  onClose: () => void;
  onConfirm: () => Promise<void>;
  onCancel: () => Promise<void>;
  isOpen?: boolean;
  withRelist?: boolean;
  project: {
    id: string;
    name: string;
  };
}
