import { isEmpty } from 'lodash';
import { AssessmentState } from '../constraints/types/assessment-types';
import { getAllAssessments, getGradeMetadata } from '../services/assessments-service';

export const populateAssessments = async (
  set: (state: Partial<AssessmentState> | ((state: AssessmentState) => AssessmentState)) => void,
  get: () => AssessmentState,
  options: {
    projectId?: string;
    force?: boolean;
  } = { force: false },
) => {
  const assessments = get().assessments;
  if (!isEmpty(assessments) && !options?.force) return;

  set({ isAssessmentsLoading: true });
  const fetchedAssessments = await getAllAssessments(options?.projectId);
  set({ assessments: fetchedAssessments || [], isAssessmentsLoading: false });
};

export const populateGradeMetadata = async (
  set: (state: Partial<AssessmentState> | ((state: AssessmentState) => AssessmentState)) => void,
  get: () => AssessmentState,
  options: { force?: boolean } = { force: false },
) => {
  const gradeMetadata = get().gradeMetadata;
  if (!isEmpty(gradeMetadata) && !options?.force) return;

  set({ isGradeMetadataLoading: true });
  const fetchedGradeMetadata = await getGradeMetadata();
  set({ gradeMetadata: fetchedGradeMetadata || [], isGradeMetadataLoading: false });
};
