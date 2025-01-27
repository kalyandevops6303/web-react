import PrimaryButton from '../../buttons/PrimaryButton';
import SecondaryButton from '../../buttons/SecondaryButton';
import GenericModal from '../GenericModal';
import ChecklistGif from '@flexternships/assets/gifs/checklist.gif';

export default function ConfirmActionModal(props: ConfirmActionModalProps) {
  const {
    onClose,
    isOpen,
    onConfirm,
    title,
    milestoneName,
    milestoneSeq,
    isConfirmLoading,
    confirmCtaText = 'Confirm',
  } = props;
  return (
    <GenericModal isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-x-6 pl-6 pr-8 py-10">
        <div className="flex flex-col justify-center items-center">
          <img className="w-48 h-48" src={ChecklistGif} alt="confirm-action" />
        </div>
        <div className="flex flex-col gap-y-10">
          <div className="flex flex-col gap-y-6 max-w-[415px]">
            <h1 className="text-2xl font-medium leading-[38px] text-grey-heading">{title}</h1>
            <div className="flex flex-col gap-y-2">
              <div className="text-lg font-medium leading-[24px] text-grey-heading">{milestoneName}</div>
              <div className="text-sm font-normal leading-[18px] text-grey-muted">Milestone {milestoneSeq}</div>
            </div>
          </div>
          <div className="flex flex-row justify-end gap-x-5">
            <SecondaryButton className="m-0" onClick={onClose}>
              Cancel
            </SecondaryButton>
            <PrimaryButton className="m-0" onClick={onConfirm} loading={isConfirmLoading}>
              {confirmCtaText}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </GenericModal>
  );
}

type ConfirmActionModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  isConfirmLoading?: boolean;
  confirmCtaText?: string;
  isOpen?: boolean;
  title: string;
  milestoneName: string;
  milestoneSeq: number;
};
