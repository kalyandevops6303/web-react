import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import { feedbackCardContent } from '@/flexternships/static/milestones-content';
import { AlertCircle, Check } from 'react-feather';

export default function FeedbackCompletedCard(props: FeedbackCompletedCardProps) {
  const { feedbackId, feedbackType, tiny = false } = props;

  // using the var to avoid tsc error temporarily
  console.log(feedbackId);

  return (
    <div
      className={`flex flex-row justify-between items-center px-6 py-5 bg-success bg-opacity-[0.12] rounded-md ${
        tiny && 'w-6/12'
      }`}
    >
      <div className="flex flex-row items-center gap-x-3">
        {tiny ? (
          <span className="text-success">
            <AlertCircle size={18} />
          </span>
        ) : (
          <span className="text-center align-middle bg-success rounded-full p-[5px]">
            <Check size={15} className="text-white" />
          </span>
        )}

        <div
          className={`${tiny ? 'text-sm leading-5.5' : 'text-base leading-6'} text-success not-italic font-semibold`}
        >
          {feedbackCardContent.title[feedbackType]} Completed{tiny && '!'}
        </div>
      </div>
      <div className="flex flex-row items-center gap-x-4">
        <span
          className={`${
            tiny ? 'text-sm text-success font-semibold' : 'text-base text-trublue-secondary-500 font-medium'
          } not-italic cursor-pointer`}
        >
          View
        </span>
        {tiny && (
          <span className="text-success border-1 border-solid border-success size-5 flex items-center justify-center rounded-full">
            <Check size={15} />
          </span>
        )}
      </div>
    </div>
  );
}

type FeedbackCompletedCardProps = {
  feedbackId: string;
  feedbackType: MilestoneFeedbackType;
  tiny?: boolean;
};
