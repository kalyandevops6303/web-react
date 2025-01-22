import * as yup from 'yup';

export const GiveCommentsSchema = yup.object().shape({
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
