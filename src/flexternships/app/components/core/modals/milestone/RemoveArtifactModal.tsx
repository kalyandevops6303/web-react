import PrimaryButton from '../../buttons/PrimaryButton';
import SecondaryButton from '../../buttons/SecondaryButton';
import GenericModal from '../GenericModal';
import DangerGif from '@flexternships/assets/gifs/danger.gif';
import { getFileIcon } from '@/flexternships/utils/file-utils';
import { MilestoneDraftArtifact } from '@/flexternships/constraints/types/project-milestones-types';
import { MilestoneArtifactType, ToastType } from '@/flexternships/constraints/enums/core-enums';
import { Link } from 'react-feather';
import { useState } from 'react';
import { showToastMessage } from '@/flexternships/utils/core-utils';

export default function RemoveArtifactModal(props: RemoveArtifactModalProps) {
  const { onClose, isOpen, onConfirm, title, description, confirmCtaText, artifact, cancelCtaText } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);

  console.log('artifact', artifact);

  const handleConfirm = async () => {
    setIsConfirmLoading(true);
    try {
      await onConfirm();
    } catch (error) {
      showToastMessage(
        ToastType.ERROR,
        error instanceof Error ? error.message : 'An unexpected error occurred while deleting milestone artifact',
      );
    } finally {
      setIsConfirmLoading(false);
    }
  };
  return (
    <GenericModal isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-x-11 pl-6 pr-8 py-10">
        <div className="flex flex-col justify-center items-center">
          <img className="w-36 h-36" src={DangerGif} alt="confirm-action" />
        </div>
        <div className="flex flex-col gap-y-9">
          <div className="flex flex-col gap-y-4 max-w-[382px]">
            <h1 className="text-2xl font-medium leading-[38px] text-grey-heading">{title}</h1>
            <div className="flex flex-row items-center gap-x-3">
              {artifact.type === MilestoneArtifactType.DOCUMENTS ? (
                <img className="h-6" src={getFileIcon(artifact.metadata?.fileName)} />
              ) : (
                <Link className="text-grey" size={24} />
              )}
              <span className="text-sm font-medium text-grey-heading leading-[23px] truncate">
                {artifact.type === MilestoneArtifactType.DOCUMENTS
                  ? artifact.metadata?.fileName || 'Unknown File'
                  : artifact.metadata?.url || 'Empty Url'}
              </span>
            </div>
            {description && <div className="text-sm font-medium leading-[23px] text-grey-heading">{description}</div>}
          </div>
          <div className="flex flex-row justify-end gap-x-5">
            {cancelCtaText && (
              <SecondaryButton className="m-0" onClick={onClose}>
                {cancelCtaText}
              </SecondaryButton>
            )}
            {confirmCtaText && (
              <PrimaryButton className="m-0" onClick={handleConfirm} loading={isConfirmLoading}>
                {confirmCtaText}
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </GenericModal>
  );
}

type RemoveArtifactModalProps = {
  onClose: () => void;
  onConfirm: () => Promise<void>;
  confirmCtaText?: string;
  cancelCtaText?: string;
  isOpen?: boolean;
  title: string;
  description?: string;
  artifact: Partial<MilestoneDraftArtifact>;
};
