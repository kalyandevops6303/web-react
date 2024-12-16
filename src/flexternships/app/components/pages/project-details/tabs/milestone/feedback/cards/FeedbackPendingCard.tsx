import Tooltip from '@/flexternships/app/components/core/Tooltip';
import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import { tooltipContent } from '@/flexternships/static/milestone-feedback-content';
import { feedbackCardContent } from '@/flexternships/static/milestones-content';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
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
  const {
    feedbackType,
    daysLeft,
    numberOfQuestions,
    timeToComplete,
    projectId,
    milestoneId,
    tiny = false,
    className,
  } = props;

  const userDetails = useFlexternUserStore((state) => state.userDetails);

  const navigate = useNavigate();

  const handleSubmitNow = () => {
    navigate(`/project-details/${projectId}/milestone/${milestoneId}/feedback/${feedbackType.toLowerCase()}`);
  };

  return (
    <div
      className={`${tiny ? 'px-4 py-3 -mt-4 pt-7' : 'p-4'} flex flex-row items-center justify-between rounded-lg ${
        tiny && 'w-6/12'
      } ${css.theme[feedbackType]} ${className ? className : 'bg-opacity-[0.12]'}`}
    >
      <div className={`flex flex-row ${tiny ? 'items-center' : 'items-start'} gap-x-2`}>
        <div className={tiny ? 'flex items-center' : ''}>
          <Tooltip
            icon={<AlertCircle size={18} />}
            content={
              daysLeft
                ? daysLeft > 0
                  ? tooltipContent.feedbackDueSoon
                  : tooltipContent.feedbackOverdue
                : tooltipContent.feedbackYetToStart[userDetails.userType]
            }
          />
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
        <div className={`text-sm font-semibold not-italic leading-5.5 ${tiny && 'flex flex-row gap-x-2 flex-wrap'}`}>
          <div className="whitespace-nowrap">{formatEpochToDuration(timeToComplete)}</div>
          <div className="whitespace-nowrap">{numberOfQuestions} Questions</div>
        </div>
        {daysLeft && (
          <div className="text-xs font-semibold not-italic leading-4.5 flex flex-col items-start gap-y-2">
            {daysLeft > 0 && !tiny && <div className="py-[1px] px-[9px]">{daysLeft} Days Left</div>}
            <div
              className={`${
                daysLeft > 0 && tiny ? '' : 'text-trublue-secondary-500'
              } bg-white py-[1px] px-[9px] rounded-3xl cursor-pointer whitespace-nowrap`}
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
  className?: string;
};
