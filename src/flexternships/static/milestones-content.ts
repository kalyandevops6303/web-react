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

export function getMilestoneDetailsModalTitle(type: MilestoneDetailsModalType): string {
  switch (type) {
    case MilestoneDetailsModalType.CONFIRM_ACCEPT_MILESTONE:
      return 'Are you sure you want to accept the milestone?';
    case MilestoneDetailsModalType.MILESTONE_ACCEPTED:
      return 'Great Job!';
    case MilestoneDetailsModalType.CONFIRM_SUBMIT_MILESTONE:
      return 'Are you sure you want to mark the milestone as complete?';
    case MilestoneDetailsModalType.MILESTONE_SUBMITTED:
      return 'Great Job!';
    case MilestoneDetailsModalType.CONFIRM_REMOVE_ARTIFACT:
      return 'Are you sure you want to remove this artifact?';
    case MilestoneDetailsModalType.ARTIFCAT_REMOVED:
      return 'Removed Artifact';
    case MilestoneDetailsModalType.CONFIRM_ARTIFACTS_SUBMISSION:
      return 'Are you sure you want to make this submission?';
    case MilestoneDetailsModalType.ARTIFCATS_SUBMITTED:
      return 'Great Job!';
    case MilestoneDetailsModalType.ARTIFACTS_DRAFT_SAVED:
      return 'Draft Saved';
    default:
      return '';
  }
}

export function getMilestoneDetailsModalDescription(type: MilestoneDetailsModalType): string | undefined {
  switch (type) {
    case MilestoneDetailsModalType.MILESTONE_ACCEPTED:
      return 'You have successfully accepted the milestone.';
    case MilestoneDetailsModalType.MILESTONE_SUBMITTED:
      return 'You have successfully completed the milestone.';
    case MilestoneDetailsModalType.CONFIRM_ACCEPT_MILESTONE:
      return undefined;
    case MilestoneDetailsModalType.CONFIRM_SUBMIT_MILESTONE:
      return undefined;
    case MilestoneDetailsModalType.CONFIRM_REMOVE_ARTIFACT:
      return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    case MilestoneDetailsModalType.ARTIFCAT_REMOVED:
      return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    case MilestoneDetailsModalType.CONFIRM_ARTIFACTS_SUBMISSION:
      return 'Only after submission client will receive these files.';
    case MilestoneDetailsModalType.ARTIFCATS_SUBMITTED:
      return 'You have successfully completed a milestone submission';
    case MilestoneDetailsModalType.ARTIFACTS_DRAFT_SAVED:
      return 'We’ve saved your work as a draft. Feel free to return when you’re ready to complete it.';
    default:
      return undefined;
  }
}

export function getMilestoneDetailsModalConfirmCtaText(type: MilestoneDetailsModalType): string | undefined {
  switch (type) {
    case MilestoneDetailsModalType.CONFIRM_ACCEPT_MILESTONE:
      return 'Accept';
    case MilestoneDetailsModalType.CONFIRM_SUBMIT_MILESTONE:
      return 'Mark as complete';
    case MilestoneDetailsModalType.MILESTONE_ACCEPTED:
      return undefined;
    case MilestoneDetailsModalType.MILESTONE_SUBMITTED:
      return undefined;
    case MilestoneDetailsModalType.CONFIRM_REMOVE_ARTIFACT:
      return 'Remove';
    case MilestoneDetailsModalType.ARTIFCAT_REMOVED:
      return undefined;
    default:
      return undefined;
  }
}

export function getMilestoneDetailsModalCancelCtaText(type: MilestoneDetailsModalType): string | undefined {
  switch (type) {
    case MilestoneDetailsModalType.CONFIRM_REMOVE_ARTIFACT:
      return 'Cancel';
    case MilestoneDetailsModalType.ARTIFCAT_REMOVED:
      return 'Close';
    default:
      return undefined;
  }
}

export const draftSavedModalNote = 'To find your drafts please go to,';
export const draftSavedModalHighlightText = 'Project Details > Milestone > Saved Drafts';
