import { create } from 'zustand';
import { AssessmentState, AssessmentStore } from '@flexternships/types/assessment-types';
import { populateAssessments, populateGradeMetadata } from '@flexternships/actions/assessment-actions';

const defaultInitState: AssessmentState = {
  assessments: [],
  isAssessmentsLoading: false,
  gradeMetadata: [],
  isGradeMetadataLoading: false,
};

export const useAssessmentsStore = create<AssessmentStore>((set, get) => ({
  ...defaultInitState,
  populateAssessments: (options: { projectId?: string; userId?: string; force?: boolean } = { force: false }) =>
    populateAssessments(set, get, options),
  populateGradeMetadata: (options: { force?: boolean } = { force: false }) => populateGradeMetadata(set, get, options),
  resetStore: () => set({ ...defaultInitState }),
}));
