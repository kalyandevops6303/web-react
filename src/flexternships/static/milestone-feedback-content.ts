import { UserType } from '../constraints/enums/core-enums';

export const tooltipContent = {
  feedbackYetToStart: {
    [UserType.CLIENT]: 'You can give feedback after accepting the milestone',
    [UserType.TALENT]: 'You can give feedback after submitting your work',
  },
  feedbackDueSoon: 'Please submit the feedback before due date',
  feedbackOverdue: 'You must submit the feedback to proceed',
  feedbackCompleted: 'You have successfully completed this feedback',
};
