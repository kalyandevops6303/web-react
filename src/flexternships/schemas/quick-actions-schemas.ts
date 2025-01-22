import * as yup from 'yup';
import { QuickActionCategory } from '../constraints/enums/quick-actions-enums';

const GiveRecognitionSchema = yup.object().shape({
  milestone: yup.object().shape({
    _id: yup.string().required('Please select a milestone'),
  }),
  selectedTalents: yup
    .array()
    .of(
      yup.object().shape({
        talentId: yup.string().required(),
        competencies: yup.array().of(yup.string()).min(1, 'Please select at least one competency'),
        comment: yup.string().required('Please enter a comment'),
      }),
    )
    .min(1, 'Please select at least one talent'),
});

const GiveNotesSchema = yup.object().shape({
  milestone: yup.object().shape({
    _id: yup.string().required('Please select a milestone'),
  }),
  selectedTalents: yup
    .array()
    .of(
      yup.object().shape({
        talentId: yup.string().required(),
        competencies: yup.array().of(yup.string()).optional(),
        noteCategory: yup.string().required('Please select a note category'),
        comment: yup.string().required('Please enter a comment'),
      }),
    )
    .min(1, 'Please select at least one talent'),
});

export const GiveCommentsSchema = {
  [QuickActionCategory.RECOGNITION]: GiveRecognitionSchema,
  [QuickActionCategory.NOTES]: GiveNotesSchema,
};
