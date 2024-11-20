import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import { MilestoneFeedbackStatus } from '@/flexternships/constraints/enums/core-enums';
import FeedbackCompletedCard from './FeedbackCompletedCard';
import FeedbackPendingCard from './FeedbackPendingCard';
import { isEmpty } from 'lodash';

export default function FeedbackStatusCard(props: FeedbackStatusCardProps) {
  const { feedbackId, feedbackStatus } = props;

  if (feedbackStatus === MilestoneFeedbackStatus.COMPLETED && isEmpty(feedbackId)) {
    throw new Error('Feedback ID is required for completed feedback');
  }

  return feedbackStatus === MilestoneFeedbackStatus.COMPLETED ? (
    <FeedbackCompletedCard {...props} feedbackId={feedbackId ?? ''} />
  ) : (
    <FeedbackPendingCard {...props} />
  );
}

type FeedbackStatusCardProps = {
  feedbackId?: string;
  feedbackStatus: MilestoneFeedbackStatus;
  feedbackType: MilestoneFeedbackType;
  numberOfQuestions: number;
  timeToComplete: number; // in epoch i.e. milliseconds
  projectId: string;
  milestoneId: string;
  daysLeft?: number;
  tiny?: boolean;
};
