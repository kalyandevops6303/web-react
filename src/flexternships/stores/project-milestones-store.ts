import { create } from 'zustand';
import {
  MilestoneDetails,
  ProjectMilestonesState,
  ProjectMilestonesStore,
} from '../constraints/types/project-milestones-types';
import { populateProjectMilestones, populateMilestoneDetails } from '../actions/project-milestones-actions';

const defaultInitState: ProjectMilestonesState = {
  isMilestonesLoading: true,
  projectMilestones: [],
  milestoneDetails: {} as MilestoneDetails,
};

export const useProjectMilestonesStore = create<ProjectMilestonesStore>((set) => ({
  ...defaultInitState,
  populateProjectMilestones: async (projectId: string) => populateProjectMilestones(projectId, set),
  populateMilestoneDetails: async (milestoneId: string) => populateMilestoneDetails(milestoneId, set),
}));
