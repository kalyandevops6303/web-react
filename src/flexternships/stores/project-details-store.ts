import { create } from 'zustand';
import {
  TeamMemberDetails,
  ProjectDetails,
  ProjectDetailsState,
  ProjectStore,
} from '../constraints/types/project-details-types';
import {
  populateTeamDetails,
  getProjectDetails,
  getProjectInvitationDetails,
  getSelfOrTeamPerformanceDetails,
  getPeerOrIndividualPerformanceDetails,
} from '../actions/project-details-actions';

const defaultInitState: ProjectDetailsState = {
  isProjectsLoading: false,
  projectDetails: {} as ProjectDetails,
  isTeamDetailsLoading: false,
  teamDetails: [] as Array<TeamMemberDetails>,
  projectInvitationDetails: null,
  isProjectInvitationDetailsLoading: false,
  performanceDetails: null,
  isPerformanceDetailsLoading: false,
};

export const useProjectsStore = create<ProjectStore>((set) => ({
  ...defaultInitState,
  getProjectDetails: async (projectId: string) => getProjectDetails(projectId, set),
  populateTeamDetails: (projectId: string = '') => populateTeamDetails(set, projectId),
  resetStore: () => set({ ...defaultInitState }),
  getProjectInvitationDetails: async (projectId: string) => getProjectInvitationDetails(projectId, set),
  getSelfOrTeamPerformanceDetails: async (projectId: string, feedbackType: string) =>
    getSelfOrTeamPerformanceDetails(projectId, feedbackType, set),
  getPeerOrIndividualPerformanceDetails: async (milestoneId: string, feedbackType: string) =>
    getPeerOrIndividualPerformanceDetails(milestoneId, feedbackType, set),
}));
