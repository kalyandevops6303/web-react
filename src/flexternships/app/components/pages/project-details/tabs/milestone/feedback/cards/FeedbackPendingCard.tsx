import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import { feedbackCardContent } from '@/flexternships/static/milestones-content';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { AlertCircle } from 'react-feather';

const css = {
  theme: {
    [MilestoneFeedbackType.PEER_FEEDBACK]: 'text-violet bg-violet',
    [MilestoneFeedbackType.SELF_FEEDBACK]: 'text-teal bg-teal',
    [MilestoneFeedbackType.INDIVIDUAL_FEEDBACK]: 'text-teal bg-teal',
    [MilestoneFeedbackType.TEAM_FEEDBACK]: 'text-violet bg-violet',
  },
};

export default function FeedbackPendingCard(props: FeedbackPendingCardProps) {
  const { feedbackType, milestoneAcceptedAt, milestoneCompletedAt, numberOfQuestions, timeToComplete } = props;

  // const userDetails = useFlexternUserStore((state) => state.userDetails);

  return (
    <div
      className={`p-4 flex flex-row items-center justify-between bg-opacity-[0.12] rounded-lg ${css.theme[feedbackType]}`}
    >
      <div className="flex flex-row items-start gap-x-2">
        <div>
          <AlertCircle size={18} />
        </div>
        <div className="text-[15px] not-italic leading-5 max-w-[732px]">
          <span className="font-semibold">{feedbackCardContent.title[feedbackType]}: </span>
          <span>{feedbackCardContent.description[feedbackType]}</span>
        </div>
      </div>
      <div className="text-sm font-semibold not-italic leading-5.5">
        <div>
          {timeToComplete / 60000} min {/** TODO: epoch to time conversion */}
        </div>
        <div>{numberOfQuestions} Questions</div>
      </div>
    </div>
  );
}

type FeedbackPendingCardProps = {
  feedbackType: MilestoneFeedbackType;
  numberOfQuestions: number;
  timeToComplete: number;
  milestoneAcceptedAt?: number;
  milestoneCompletedAt?: number;
};
