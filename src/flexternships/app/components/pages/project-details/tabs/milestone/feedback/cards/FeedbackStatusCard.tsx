import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import { MilestoneFeedbackStatus } from '@/flexternships/constraints/enums/core-enums';
import FeedbackCompletedCard from './FeedbackCompletedCard';
import FeedbackPendingCard from './FeedbackPendingCard';

export default function FeedbackStatusCard(props: FeedbackStatusCardProps) {
  const { feedbackStatus, disabled } = props;

  if (disabled && feedbackStatus === MilestoneFeedbackStatus.PENDING)
    return (
      <div className="opacity-50 cursor-not-allowed pointer-events-none">
        <FeedbackPendingCard {...props} />
      </div>
    );

  return feedbackStatus === MilestoneFeedbackStatus.COMPLETED ? (
    <FeedbackCompletedCard {...props} />
  ) : (
    <FeedbackPendingCard {...props} />
  );
}

type FeedbackStatusCardProps = {
  feedbackStatus: MilestoneFeedbackStatus;
  feedbackType: MilestoneFeedbackType;
  numberOfQuestions: number;
  timeToComplete: number; // in epoch i.e. milliseconds
  projectId: string;
  milestoneId: string;
  daysLeft?: number;
  tiny?: boolean;
  disabled?: boolean;
};
