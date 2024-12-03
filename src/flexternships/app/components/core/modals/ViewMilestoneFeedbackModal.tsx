import IndividualFeedback from '@/flexternships/app/project-details/tabs/performance/IndividualFeedback';
import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import { viewMilestoneFeedbackModalTitle } from '@/flexternships/static/milestones-content';
import { X } from 'react-feather';

export default function ViewMilestoneFeedbackModal(props: ViewMilestoneFeedbackModalProps) {
  const { feedbackType, milestoneId, isOpen, closeModal } = props;

  if (!isOpen) return null;

  if (!milestoneId) throw new Error('Milestone ID is required to view feedback');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-10 w-[1038px] relative">
        <div
          className="absolute -top-2 -right-2 bg-white rounded-md p-2 shadow-table cursor-pointer"
          onClick={closeModal}
        >
          <X size={16} />
        </div>
        <div className="flex flex-col grow gap-y-5 max-h-[70vh] overflow-y-auto overflow-x-hidden">
          <h1 className="text-[28px] text-center font-normal text-grey-heading">
            {viewMilestoneFeedbackModalTitle[feedbackType]}
          </h1>
          <IndividualFeedback feedbackType={feedbackType} milestoneId={milestoneId} />
        </div>
      </div>
    </div>
  );
}

type ViewMilestoneFeedbackModalProps = {
  // onConfirm: () => void;
  feedbackType: MilestoneFeedbackType;
  milestoneId: string;
  isOpen: boolean;
  closeModal: () => void;
};
