import { create } from 'zustand';
import {
  MilestoneArtifact,
  MilestoneArtifactsState,
  MilestoneArtifactsStore,
  MilestoneDetails,
  ProjectMilestonesState,
  ProjectMilestonesStore,
} from '../constraints/types/project-milestones-types';
import {
  populateProjectMilestones,
  populateMilestoneDetails,
  submitDraftArtifacts,
  saveDraftArtifacts,
} from '../actions/project-milestones-actions';

const defaultProjectMilestonesInitState: ProjectMilestonesState = {
  isMilestonesLoading: true,
  projectMilestones: [],
  milestoneDetails: {} as MilestoneDetails,
};

export const useProjectMilestonesStore = create<ProjectMilestonesStore>((set) => ({
  ...defaultProjectMilestonesInitState,
  populateProjectMilestones: async (projectId: string) => populateProjectMilestones(projectId, set),
  populateMilestoneDetails: async (milestoneId: string) => populateMilestoneDetails(milestoneId, set),
}));

const defaultMilestoneArtifactsInitState: MilestoneArtifactsState = {
  draftArtifacts: [],
  submittedArtifacts: [],
};

export const useMilestoneArtifactsStore = create<MilestoneArtifactsStore>((set, get) => ({
  ...defaultMilestoneArtifactsInitState,
  saveDraftArtifacts: () => saveDraftArtifacts(get, set),
  submitDraftArtifacts: () => submitDraftArtifacts(get, set),
  setDraftArtifacts: (artifacts: MilestoneArtifact[]) => set({ draftArtifacts: artifacts }),
  setSubmittedArtifacts: (artifacts: MilestoneArtifact[]) => set({ submittedArtifacts: artifacts }),
  resetDraftArtifacts: () => set({ ...defaultMilestoneArtifactsInitState }),
}));
