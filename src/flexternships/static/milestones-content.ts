import { MilestoneFeedbackType, MilestoneStatus, UserType } from '../constraints/enums/core-enums';
import { RecognitionType } from '../constraints/enums/feedback-enum';
import { MilestoneDetailsModalType } from '../constraints/enums/miscellaneous-enums';

export const recognitionCardContent = {
  title: 'Recognition',
  description: {
    [UserType.TALENT]:
      'Impressed with a talent and want to acknowledge him/her for their performance. Than give them a Kudos in recognition of their fantastic work. This is a goo way to acknowledge an & motivate them.',
    [UserType.CLIENT]:
      'Impressed with a talent and want to acknowledge him/her for their performance. Than give them a WoW in recognition of their fantastic work. This is a goo way to acknowledge an & motivate them.',
  },
  primaryCtaText: {
    [UserType.TALENT]: 'Give Kudos',
    [UserType.CLIENT]: 'Give WoW',
  },
  recognitionType: {
    [UserType.TALENT]: RecognitionType.KUDOS,
    [UserType.CLIENT]: RecognitionType.WOW,
  },
};

export const feedbackCardContent = {
  title: {
    [MilestoneFeedbackType.TEAM_FEEDBACK]: 'Team Feedback',
    [MilestoneFeedbackType.INDIVIDUAL_FEEDBACK]: 'Individual Feedback',
    [MilestoneFeedbackType.SELF_FEEDBACK]: 'Self Feedback',
    [MilestoneFeedbackType.PEER_FEEDBACK]: 'Peer Feedback',
  },
  description: {
    [MilestoneFeedbackType.TEAM_FEEDBACK]:
      'Your feedback on the team performance is very critical. this information will help us understand the quality or talent pool. It will take 3min with 10 question to complete the feedback',
    [MilestoneFeedbackType.INDIVIDUAL_FEEDBACK]:
      'Your feedback on the individual performance is very critical. this information will help us understand the quality or talent pool. It will take 3min with 10 question to complete the feedback',
    [MilestoneFeedbackType.SELF_FEEDBACK]:
      'Your feedback on the team performance is very critical. this information will help us understand the quality or talent pool. It will take 3min with 10 question to complete the feedback',
    [MilestoneFeedbackType.PEER_FEEDBACK]:
      'Your feedback on the individual performance is very critical. this information will help us understand the quality or talent pool. It will take 3min with 10 question to complete the feedback',
  },
};

export const viewMilestoneFeedbackModalTitle = {
  [MilestoneFeedbackType.TEAM_FEEDBACK]: 'Team Feedback',
  [MilestoneFeedbackType.INDIVIDUAL_FEEDBACK]: 'Individual Feedback',
  [MilestoneFeedbackType.SELF_FEEDBACK]: 'Self Feedback',
  [MilestoneFeedbackType.PEER_FEEDBACK]: 'Peer Feedback',
};

export const allowFeedbackCardsIfMilestoneStatus = [
  MilestoneStatus.IN_PROGRESS,
  MilestoneStatus.COMPLETED,
  MilestoneStatus.IN_REVIEW,
];

export const disableArtifactsIfMilestoneStatus = [MilestoneStatus.CREATED, MilestoneStatus.COMPLETED];

export const milestoneDetailsModalTitle = {
  [MilestoneDetailsModalType.CONFIRM_ACCEPT_MILESTONE]: 'Are you sure you want to accept the milestone?',
  [MilestoneDetailsModalType.MILESTONE_ACCEPTED]: 'Great Job!',
  [MilestoneDetailsModalType.CONFIRM_SUBMIT_MILESTONE]: 'Are you sure you want to mark the milestone as complete?',
  [MilestoneDetailsModalType.MILESTONE_SUBMITTED]: 'Great Job!',
  [MilestoneDetailsModalType.CONFIRM_REMOVE_ARTIFACT]: 'Are you sure you want to remove this artifact?',
  [MilestoneDetailsModalType.ARTIFCAT_REMOVED]: 'Removed Artifact',
};

export const milestoneDetailsModalDescription = {
  [MilestoneDetailsModalType.MILESTONE_ACCEPTED]: 'You have successfully accepted the milestone.',
  [MilestoneDetailsModalType.MILESTONE_SUBMITTED]: 'You have successfully completed the milestone.',
  [MilestoneDetailsModalType.CONFIRM_ACCEPT_MILESTONE]: undefined,
  [MilestoneDetailsModalType.CONFIRM_SUBMIT_MILESTONE]: undefined,
  [MilestoneDetailsModalType.CONFIRM_REMOVE_ARTIFACT]:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  [MilestoneDetailsModalType.ARTIFCAT_REMOVED]:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export const milestoneDetailsModalConfirmCtaText = {
  [MilestoneDetailsModalType.CONFIRM_ACCEPT_MILESTONE]: 'Accept',
  [MilestoneDetailsModalType.CONFIRM_SUBMIT_MILESTONE]: 'Mark as complete',
  [MilestoneDetailsModalType.MILESTONE_ACCEPTED]: undefined,
  [MilestoneDetailsModalType.MILESTONE_SUBMITTED]: undefined,
  [MilestoneDetailsModalType.CONFIRM_REMOVE_ARTIFACT]: 'Remove',
  [MilestoneDetailsModalType.ARTIFCAT_REMOVED]: undefined,
};

export const milestoneDetailsModalCancelCtaText = {
  [MilestoneDetailsModalType.CONFIRM_REMOVE_ARTIFACT]: 'Cancel',
  [MilestoneDetailsModalType.ARTIFCAT_REMOVED]: 'Close',
};
