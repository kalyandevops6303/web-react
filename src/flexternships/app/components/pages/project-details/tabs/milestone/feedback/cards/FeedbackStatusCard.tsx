import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import { MilestoneFeedbackStatus } from '@/flexternships/constraints/enums/core-enums';
import FeedbackCompletedCard from './FeedbackCompletedCard';
import FeedbackPendingCard from './FeedbackPendingCard';

export default function FeedbackStatusCard(props: FeedbackStatusCardProps) {
  const { feedbackStatus } = props;

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
  timeToComplete: number;
  milestoneAcceptedAt?: number;
  milestoneCompletedAt?: number;
};
