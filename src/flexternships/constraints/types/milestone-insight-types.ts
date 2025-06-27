import { MilestoneFeedbackType } from '../enums/core-enums';
import { MilestoneFeedbackStatus } from '../enums/feedback-enums';

export type FeedbackProgress = {
  type: MilestoneFeedbackType;
  status: MilestoneFeedbackStatus;
};

export type MilestoneFeedbackProgress = {
  project: {
    id?: string;
    name: string;
  };
  milestone: {
    id?: string;
    name: string;
  };
  overallStatus?: MilestoneFeedbackStatus;
  feedbacks: FeedbackProgress[];
};

export type PullRequestInsights = {
  id: string;
  number: number;
  prCreatedAt: string;
  prMergedAt: string | null;
  projectId: string;
  title: string;
  userId: string;
  llmSummary: string;
  overallScore: number;
  bugs: number;
  codeSmells: number;
  vulnerabilities: number;
  reliabilityRatingGrade: string;
  securityRatingGrade: string;
  maintainabilityRatingGrade: string;
  overallRatingGrade: string;
  state: string;
};

export type MeetingInsights = {
  id: string;
  projectId: string;
  userId: string;
  transcriptId: string;
  createdAt: string;
  summary: string;
  title: string;
};
