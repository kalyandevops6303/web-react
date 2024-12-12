import SecondaryButton from '../../buttons/SecondaryButton';
import GenericModal from '../GenericModal';
import CelebrationGif from '@flexternships/assets/gifs/celebration.gif';

export default function CelebrationModal(props: CelebrationModalProps) {
  const { onClose, isOpen, title, milestoneSeq, projectName, description } = props;
  return (
    <GenericModal isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-x-6 pl-6 pr-8 py-10">
        <div className="flex flex-col justify-center items-center">
          <img className="w-56 h-56 object-cover" src={CelebrationGif} alt="confirm-action" />
        </div>
        <div className="flex flex-col gap-y-10">
          <div className="flex flex-col gap-y-5 max-w-[415px]">
            <h1 className="text-[28px] font-medium text-grey-heading">{title}</h1>
            <div className="flex flex-col gap-y-6">
              {description && <div className="text-grey text-lg font-normal">{description}</div>}
              <div className="flex flex-col gap-y-2 text-grey text-lg font-normal">
                <div className="flex flex-row gap-x-4">
                  <span className="text-grey-heading font-medium">Milestone:</span>
                  <span>Milestone {milestoneSeq}</span>
                </div>
                {projectName && (
                  <div className="flex flex-row gap-x-4">
                    <span className="text-grey-heading font-medium whitespace-nowrap">Project Name:</span>
                    <span className="truncate">{projectName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-end gap-x-5">
            <SecondaryButton className="m-0" onClick={onClose}>
              Close
            </SecondaryButton>
          </div>
        </div>
      </div>
    </GenericModal>
  );
}

type CelebrationModalProps = {
  onClose: () => void;
  isOpen?: boolean;
  title: string;
  description?: string;
  projectName: string;
  milestoneSeq: number;
};
