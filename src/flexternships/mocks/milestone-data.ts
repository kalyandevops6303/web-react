import { MilestoneFeedbackType } from '../constraints/enums/core-enums';

import { MilestoneFeedbackStatus } from '../constraints/enums/core-enums';

export const mockMilestoneClientFeedbackData = [
  {
    feedbackId: '1',
    feedbackType: MilestoneFeedbackType.TEAM_FEEDBACK,
    feedbackStatus: MilestoneFeedbackStatus.PENDING,
    numberOfQuestions: 8,
    timeToComplete: 3 * 60 * 1000,
  },
  {
    feedbackType: MilestoneFeedbackType.INDIVIDUAL_FEEDBACK,
    feedbackStatus: MilestoneFeedbackStatus.PENDING,
    numberOfQuestions: 8,
    timeToComplete: 3 * 60 * 1000,
  },
];

export const mockMilestoneTalentFeedbackData = [
  {
    feedbackId: '1',
    feedbackType: MilestoneFeedbackType.SELF_FEEDBACK,
    feedbackStatus: MilestoneFeedbackStatus.COMPLETED,
    numberOfQuestions: 8,
    timeToComplete: 3 * 60 * 1000,
  },
  {
    feedbackType: MilestoneFeedbackType.PEER_FEEDBACK,
    feedbackStatus: MilestoneFeedbackStatus.PENDING,
    numberOfQuestions: 8,
    timeToComplete: 3 * 60 * 1000,
  },
];
