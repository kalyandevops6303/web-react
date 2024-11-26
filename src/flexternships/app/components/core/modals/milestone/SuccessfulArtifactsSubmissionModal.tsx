import { MilestoneDraftArtifact } from '@/flexternships/constraints/types/project-milestones-types';
import SecondaryButton from '../../buttons/SecondaryButton';
import GenericModal from '../GenericModal';
import CelebrationGif from '@flexternships/assets/gifs/celebration.gif';
import { getFileIcon } from '@/flexternships/utils/file-utils';
import { MilestoneArtifactType } from '@/flexternships/constraints/enums/core-enums';
import { Link } from 'react-feather';

export default function SuccessfulArtifactsSubmissionModal(props: SuccessfulArtifactsSubmissionModalProps) {
  const { onClose, isOpen, title, description, artifacts } = props;
  return (
    <GenericModal isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-x-6 pl-6 pr-8 pt-10 pb-6">
        <div className="flex flex-col justify-center items-center">
          <img className="w-52 h-52 object-cover" src={CelebrationGif} alt="celebration-gif" />
        </div>
        <div className="flex flex-col gap-y-11">
          <div className="flex flex-col gap-y-5 max-w-[415px]">
            <h1 className="text-2xl font-medium leading-[38px] text-grey-heading">{title}</h1>
            {description && <div className="text-lg font-normal leading-6 text-grey">{description}</div>}
            <div className="flex flex-col gap-y-3">
              {artifacts.map((artifactItem, index) => (
                <div key={index} className="flex flex-row items-center gap-x-3">
                  {artifactItem.type === MilestoneArtifactType.DOCUMENTS ? (
                    <img className="h-6" src={getFileIcon(artifactItem.metadata?.fileName)} />
                  ) : (
                    <Link className="text-grey" size={24} />
                  )}
                  <span className="text-sm font-medium text-grey-heading leading-[23px] truncate">
                    {artifactItem.type === MilestoneArtifactType.DOCUMENTS
                      ? artifactItem.metadata?.fileName || 'Unknown File'
                      : artifactItem.metadata?.url || 'Empty Url'}
                  </span>
                </div>
              ))}
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

type SuccessfulArtifactsSubmissionModalProps = {
  onClose: () => void;
  isOpen?: boolean;
  title: string;
  description?: string;
  artifacts: Partial<MilestoneDraftArtifact>[];
};
