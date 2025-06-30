import { MilestoneFeedbackInputCellType } from '@/flexternships/constraints/enums/feedback-enums';
import { UserType } from '../../constraints/enums/core-enums';

export const tooltipContent = {
  feedbackYetToStart: {
    [UserType.CLIENT]: 'You can give feedback after accepting the milestone',
    [UserType.TALENT]: 'You can give feedback after submitting your work',
  },
  feedbackDueSoon: 'Please submit the feedback before due date',
  feedbackOverdue: 'You must submit the feedback to proceed',
  feedbackCompleted: 'You have successfully completed this feedback',
};

export const teamColumns = [
  { value: 'Feedback', identifier: 'feedback', width: 400 },
  {
    value: 'Ratings',
    identifier: 'ratings',
    inputConfig: {
      type: MilestoneFeedbackInputCellType.NUMBER,
      min: 1,
      max: 5,
    },
  },
];
