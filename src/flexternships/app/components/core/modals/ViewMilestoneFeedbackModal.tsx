import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import { viewMilestoneFeedbackModalTitle } from '@/flexternships/static/milestones-content';
import { useEffect, useState } from 'react';
import { X } from 'react-feather';
import Spinner from '../Spinner';

export default function ViewMilestoneFeedbackModal(props: ViewMilestoneFeedbackModalProps) {
  const { feedbackType, milestoneId, isOpen, closeModal } = props;

  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);

  useEffect(() => {
    const fetchFeedback = async () => {
      setIsFeedbackLoading(true);
      // const feedback = await getMilestoneFeedback(feedbackId);
      setTimeout(() => {
        setIsFeedbackLoading(false);
      }, 2000);
    };
    fetchFeedback();
  }, [isOpen, milestoneId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-10 min-w-[1038px] relative">
        <div
          className="absolute -top-2 -right-2 bg-white rounded-md p-2 shadow-table cursor-pointer"
          onClick={closeModal}
        >
          <X size={16} />
        </div>
        <div className="flex flex-col items-center grow gap-y-5">
          <h1 className="text-[28px] font-normal text-grey-heading">{viewMilestoneFeedbackModalTitle[feedbackType]}</h1>
          {isFeedbackLoading ? (
            <div className="flex justify-center items-center p-10">
              <div className="w-10 h-10">
                <Spinner />
              </div>
            </div>
          ) : (
            <div>Show feedback here</div>
          )}
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
