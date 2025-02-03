import { create } from 'zustand';
import {
  TeamMemberDetails,
  ProjectDetails,
  ProjectDetailsState,
  ProjectStore,
  ProjectInvitation,
} from '../constraints/types/project-details-types';
import {
  populateTeamDetails,
  getProjectDetails,
  getProjectInvitationDetails,
  getSelfOrTeamPerformanceDetails,
  getPeerOrIndividualPerformanceDetails,
  setInvitationAsRead,
} from '../actions/project-details-actions';
import { ProjectSecondaryStatus } from '../constraints/enums/core-enums';

const defaultInitState: ProjectDetailsState = {
  isProjectsLoading: false,
  projectDetails: {} as ProjectDetails,
  projectDetailsLoading: false,
  isTeamDetailsLoading: false,
  teamDetails: [] as Array<TeamMemberDetails>,
  projectInvitationDetails: {} as ProjectInvitation,
  isProjectInvitationDetailsLoading: false,
  performanceDetails: null,
  isPerformanceDetailsLoading: false,
};

export const useProjectsStore = create<ProjectStore>((set) => ({
  ...defaultInitState,
  getProjectDetails: async (
    projectId: string,
    onSuccessBySecondaryStatus?: (secondaryStatus: ProjectSecondaryStatus, isDocumentsNeeded: boolean) => void,
  ) => getProjectDetails(projectId, set, onSuccessBySecondaryStatus),
  populateTeamDetails: (projectId: string) => populateTeamDetails(set, projectId),
  resetStore: () => set({ ...defaultInitState }),
  getProjectInvitationDetails: async (projectId: string) => getProjectInvitationDetails(projectId, set),
  getSelfOrTeamPerformanceDetails: async (projectId: string, feedbackType: string) =>
    getSelfOrTeamPerformanceDetails(projectId, feedbackType, set),
  getPeerOrIndividualPerformanceDetails: async (milestoneId: string, feedbackType: string) =>
    getPeerOrIndividualPerformanceDetails(milestoneId, feedbackType, set),
  setProjectInvitationRead: async (projectId: string) => setInvitationAsRead(projectId, set),
}));
