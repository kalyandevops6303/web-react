import { MilestoneFeedbackInputCellType } from '@/flexternships/constraints/enums/beta-feedback-enums';

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
