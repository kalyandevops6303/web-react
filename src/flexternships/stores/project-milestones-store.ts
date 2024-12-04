import { create } from 'zustand';
import {
  MilestoneArtifact,
  MilestoneArtifactsState,
  MilestoneArtifactsStore,
  MilestoneDetails,
  MilestoneDraftArtifact,
  ProjectMilestonesState,
  ProjectMilestonesStore,
} from '../constraints/types/project-milestones-types';
import {
  populateProjectMilestones,
  populateMilestoneDetails,
  appendToRemovedArtifactIds,
  putDraftArtifacts,
  markMilestoneAsCompleted,
  acceptMilestone,
  closeModal,
  openModal,
} from '../actions/project-milestones-actions';
import { MilestoneArtifactStatus } from '../constraints/enums/core-enums';
import { MilestoneDetailsModalType } from '../constraints/enums/miscellaneous-enums';

const defaultProjectMilestonesInitState: ProjectMilestonesState = {
  isMilestonesLoading: true,
  isMilestoneDetailsLoading: true,
  activeModal: undefined,
  projectMilestones: [],
  milestoneDetails: {} as MilestoneDetails,
};

export const useProjectMilestonesStore = create<ProjectMilestonesStore>((set) => ({
  ...defaultProjectMilestonesInitState,
  populateProjectMilestones: async (projectId: string) => populateProjectMilestones(projectId, set),
  populateMilestoneDetails: async (milestoneId: string) => populateMilestoneDetails(milestoneId, set),
  markMilestoneAsCompleted: async (milestoneId: string) => markMilestoneAsCompleted(milestoneId),
  acceptMilestone: async (milestoneId: string) => acceptMilestone(milestoneId),
  closeModal: () => closeModal(set),
  openModal: (modal: MilestoneDetailsModalType, metadata?: Record<string, any>) => openModal(modal, set, metadata),
}));

const defaultMilestoneArtifactsInitState: MilestoneArtifactsState = {
  draftArtifacts: [],
  submittedArtifacts: [],
  removedArtifactIds: [],
};

export const useMilestoneArtifactsStore = create<MilestoneArtifactsStore>((set, get) => ({
  ...defaultMilestoneArtifactsInitState,
  saveDraftArtifacts: async (milestoneId: string) =>
    putDraftArtifacts(MilestoneArtifactStatus.DRAFT, milestoneId, get, set),
  submitDraftArtifacts: async (milestoneId: string) =>
    putDraftArtifacts(MilestoneArtifactStatus.SUBMITTED, milestoneId, get, set),
  updateDraftArtifacts: (artifacts: MilestoneDraftArtifact[]) => set({ draftArtifacts: artifacts }),
  updateSubmittedArtifacts: (artifacts: MilestoneArtifact[]) => set({ submittedArtifacts: artifacts }),
  appendToRemovedArtifactIds: (artifactId: string) => appendToRemovedArtifactIds(artifactId, get, set),
  resetDraftArtifacts: () => set({ ...defaultMilestoneArtifactsInitState }),
}));
