import { AssessmentType } from '@/flexternships/constraints/enums/assessment-enums';

export const getReadableAssessmentType = (type: AssessmentType) => {
  if (type === AssessmentType.BENCHMARKING) return 'Benchmarking Assessment';
  if (type === AssessmentType.END_OF_PROJECT) return 'End of Project Assessment';
  return 'Unknown Assessment';
};
