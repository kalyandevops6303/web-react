import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import { feedbackCardContent } from '@/flexternships/static/milestones-content';
import { formatEpochToDuration } from '@/flexternships/utils/date-utils';
import { AlertCircle } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const css = {
  theme: {
    [MilestoneFeedbackType.PEER_FEEDBACK]: 'text-violet bg-violet',
    [MilestoneFeedbackType.SELF_FEEDBACK]: 'text-teal bg-teal',
    [MilestoneFeedbackType.INDIVIDUAL_FEEDBACK]: 'text-teal bg-teal',
    [MilestoneFeedbackType.TEAM_FEEDBACK]: 'text-violet bg-violet',
  },
};

export default function FeedbackPendingCard(props: FeedbackPendingCardProps) {
  const { feedbackType, daysLeft, numberOfQuestions, timeToComplete, projectId, milestoneId, tiny = false } = props;

  const navigate = useNavigate();

  const handleSubmitNow = () => {
    navigate(`/project-details/${projectId}/milestone/${milestoneId}/feedback/${feedbackType.toLowerCase()}`);
  };

  return (
    <div
      className={`${
        tiny ? 'px-4 py-3 -mt-4 pt-7' : 'p-4'
      } flex flex-row items-center justify-between bg-opacity-[0.12] rounded-lg ${tiny && 'w-6/12'} ${
        css.theme[feedbackType]
      }`}
    >
      <div className="flex flex-row items-start gap-x-2">
        <div>
          <AlertCircle size={18} />
        </div>
        <div className="text-[15px] not-italic leading-5 max-w-[732px]">
          <span className="font-semibold">
            {feedbackCardContent.title[feedbackType]}
            {!tiny && ': '}
          </span>
          {!tiny && <span>{feedbackCardContent.description[feedbackType]}</span>}
        </div>
      </div>
      <div className="flex flex-row items-center gap-x-[14px]">
        <div className={`text-sm font-semibold not-italic leading-5.5 ${tiny && 'flex flex-row gap-x-2'}`}>
          <div>{formatEpochToDuration(timeToComplete)}</div>
          <div>{numberOfQuestions} Questions</div>
        </div>
        {daysLeft && (
          <div className="text-xs font-semibold not-italic leading-4.5 flex flex-col items-start gap-y-2">
            {daysLeft > 0 && !tiny && <div className="py-[1px] px-[9px]">{daysLeft} Days Left</div>}
            <div
              className={`${
                daysLeft > 0 && tiny ? '' : 'text-trublue-secondary-500'
              } bg-white py-[1px] px-[9px] rounded-3xl cursor-pointer`}
              onClick={handleSubmitNow}
            >
              {daysLeft > 0 && tiny ? `${daysLeft} Days Left` : 'Submit Now'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type FeedbackPendingCardProps = {
  feedbackType: MilestoneFeedbackType;
  numberOfQuestions: number;
  timeToComplete: number;
  projectId: string;
  milestoneId: string;
  daysLeft?: number;
  tiny?: boolean;
};
