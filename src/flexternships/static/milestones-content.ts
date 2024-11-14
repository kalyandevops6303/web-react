import { MilestoneFeedbackType, UserType } from '../constraints/enums/core-enums';

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
