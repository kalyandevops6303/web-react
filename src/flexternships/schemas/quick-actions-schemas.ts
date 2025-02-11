import * as yup from 'yup';
import { QuickActionCategory } from '../constraints/enums/quick-actions-enums';
import { UserType } from '../constraints/enums/core-enums';

const GiveKudosSchema = yup.object().shape({
  milestone: yup.object().shape({
    _id: yup.string().required('Please select a milestone'),
  }),
  selectedTalents: yup
    .array()
    .of(
      yup.object().shape({
        talentId: yup.string().required(),
        competencies: yup.array().of(yup.string()).min(1, 'Please select at least one competency'),
        comment: yup.string().required('Please enter all required details to submit.'),
      }),
    )
    .min(1, 'Please select at least one talent'),
});

const GiveWowSchema = yup.object().shape({
  milestone: yup.object().shape({
    _id: yup.string().required('Please select a milestone'),
  }),
  selectedTalents: yup
    .array()
    .of(
      yup.object().shape({
        talentId: yup.string().required(),
        competencies: yup.array().of(yup.string()).min(1, 'Please select at least one competency'),
        comment: yup.string().optional(),
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
        comment: yup.string().required('Please enter all required details to submit or add more Notes.'),
      }),
    )
    .min(1, 'Please select at least one talent'),
});

/**
 * Returns the appropriate schema based on the category and user type.
 * @param category - The category of the quick action.
 * @param userType - The type of user.
 * @returns The schema for the given category and user type.
 */
export const getGiveCommentsSchema = (category: QuickActionCategory, userType: UserType) => {
  if (category === QuickActionCategory.RECOGNITION) {
    return userType === UserType.CLIENT ? GiveWowSchema : GiveKudosSchema;
  }

  if (userType === UserType.TALENT) throw new Error('Notes are not allowed for TALENT');
  return GiveNotesSchema;
};
