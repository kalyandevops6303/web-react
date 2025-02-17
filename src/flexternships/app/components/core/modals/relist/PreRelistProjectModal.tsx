import PrimaryButton from '../../buttons/PrimaryButton';
import SecondaryButton from '../../buttons/SecondaryButton';
import GenericModal from '../GenericModal';
import ChecklistGif from '@flexternships/assets/gifs/checklist.gif';
import { useNavigate } from 'react-router-dom';
import routes from '@/flexternships/routes';

export default function PreRelistProjectModal(props: PreRelistProjectModalProps) {
  const { onClose, isOpen, onConfirm } = props;
  const navigate = useNavigate();

  const goToCreateProject = () => {
    navigate(routes.createProject.path);
    onClose();
  };

  return (
    <GenericModal className="max-w-[650px]" isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-x-4 pl-6 pr-8 py-10">
        <div className="flex flex-col justify-center items-center">
          <img className="size-48" src={ChecklistGif} alt="confirm-action" />
        </div>
        <div className="flex flex-col grow gap-y-4">
          <div className="flex flex-col gap-y-4">
            <div className="text-2xl font-medium text-grey-heading not-italic">
              Are you sure you want to re-list project?
            </div>
            <div className="text-lg text-grey font-normal leading-7">
              <span className="font-semibold">Note: </span>
              You will not be able to edit project. Create a new project if you want to make changes.
            </div>
          </div>
          <div className="flex flex-row justify-end gap-x-5">
            <SecondaryButton className="m-0" onClick={goToCreateProject}>
              Create New Project
            </SecondaryButton>
            <PrimaryButton className="m-0" onClick={onConfirm}>
              Re-list
            </PrimaryButton>
          </div>
        </div>
      </div>
    </GenericModal>
  );
}

interface PreRelistProjectModalProps {
  onClose: () => void;
  isOpen?: boolean;
  onConfirm: () => void;
}
