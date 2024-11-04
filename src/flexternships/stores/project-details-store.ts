import { create } from 'zustand';
import {
  TeamMemberDetails,
  ProjectDetails,
  ProjectDetailsState,
  ProjectStore,
} from '../constraints/types/project-details-types';
import { populateTeamDetails, getProjectDetails } from '../actions/project-details-actions';

const defaultInitState: ProjectDetailsState = {
  isProjectsLoading: false,
  projectDetails: {} as ProjectDetails,
  teamDetails: [] as Array<TeamMemberDetails>,
};

export const useProjectsStore = create<ProjectStore>((set) => ({
  ...defaultInitState,
  getProjectDetails: async (projectId: string) => getProjectDetails(projectId, set),
  populateTeamDetails: (projectId: string = '') => populateTeamDetails(set, projectId),
  resetStore: () => set({ ...defaultInitState }),
}));
