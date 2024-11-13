import { MilestoneArtifactStatus, MilestoneStatus } from '../constraints/enums/core-enums';
import {
  getMilestonesByProjectId,
  getMilestoneDetailsById,
  putArtifactsByMilestoneId,
  updateMilestoneStatus,
} from '../services/project-management-v2';
import { useMilestoneArtifactsStore } from '../stores/project-milestones-store';

export const populateProjectMilestones = async (projectId: string, set: any) => {
  set({ isMilestonesLoading: true });
  const milestones = await getMilestonesByProjectId(projectId);
  set({ projectMilestones: milestones, isMilestonesLoading: false });
};

export const populateMilestoneDetails = async (milestoneId: string, set: any) => {
  set({ isMilestoneDetailsLoading: true });

  const updateDraftArtifacts = useMilestoneArtifactsStore.getState().updateDraftArtifacts;
  const updateSubmittedArtifacts = useMilestoneArtifactsStore.getState().updateSubmittedArtifacts;

  const data = await getMilestoneDetailsById(milestoneId);

  set({ milestoneDetails: data?.milestoneDetails });
  updateDraftArtifacts(data?.artifactDetails?.milestoneArtifactDetailsDraft || []);
  updateSubmittedArtifacts(data?.artifactDetails?.milestoneArtifactDetailsSubmitted || []);

  set({ isMilestoneDetailsLoading: false });
};

export const putDraftArtifacts = async (status: MilestoneArtifactStatus, milestoneId: string, get: any, _set: any) => {
  const draftArtifacts = get().draftArtifacts;
  const removedArtifactIds = get().removedArtifactIds;
  await putArtifactsByMilestoneId(status, milestoneId, draftArtifacts, removedArtifactIds);
};

export const appendToRemovedArtifactIds = (artifactId: string, get: any, set: any) => {
  set({ removedArtifactIds: [...get().removedArtifactIds, artifactId] });
};

export const markMilestoneAsCompleted = async (milestoneId: string) => {
  await updateMilestoneStatus(milestoneId, MilestoneStatus.IN_REVIEW);
};

export const acceptMilestone = async (milestoneId: string) => {
  await updateMilestoneStatus(milestoneId, MilestoneStatus.COMPLETED);
};
