import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import { MilestoneFeedbackStatus } from '@/flexternships/constraints/enums/core-enums';
import FeedbackCompletedCard from './FeedbackCompletedCard';
import FeedbackPendingCard from './FeedbackPendingCard';

export default function FeedbackStatusCard(props: FeedbackStatusCardProps) {
  const { feedbackStatus, disabled } = props;

  return feedbackStatus === MilestoneFeedbackStatus.COMPLETED ? (
    <FeedbackCompletedCard {...props} />
  ) : (
    <FeedbackPendingCard {...props} className={disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} />
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
