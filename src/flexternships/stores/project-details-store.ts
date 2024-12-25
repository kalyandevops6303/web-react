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
  setTerminateProject,
  setWithdrawProject,
  setRelistProject,
  setInvitationAsRead,
} from '../actions/project-details-actions';
import { ProjectSecondaryStatus } from '../constraints/enums/core-enums';

const defaultInitState: ProjectDetailsState = {
  isProjectsLoading: false,
  projectDetails: {} as ProjectDetails,
  projectDetailsLoading: false,
  isTeamDetailsLoading: false,
  teamDetails: [] as Array<TeamMemberDetails>,
  projectInvitationDetails: null,
  isProjectInvitationDetailsLoading: false,
  performanceDetails: null,
  isPerformanceDetailsLoading: false,
};

export const useProjectsStore = create<ProjectStore>((set) => ({
  ...defaultInitState,
  getProjectDetails: async (
    projectId: string,
    onSuccessBySecondaryStatus?: (secondaryStatus: ProjectSecondaryStatus) => void,
  ) => getProjectDetails(projectId, set, onSuccessBySecondaryStatus),
  populateTeamDetails: (projectId: string) => populateTeamDetails(set, projectId),
  resetStore: () => set({ ...defaultInitState }),
  getProjectInvitationDetails: async (projectId: string) => getProjectInvitationDetails(projectId, set),
  getSelfOrTeamPerformanceDetails: async (projectId: string, feedbackType: string) =>
    getSelfOrTeamPerformanceDetails(projectId, feedbackType, set),
  getPeerOrIndividualPerformanceDetails: async (milestoneId: string, feedbackType: string) =>
    getPeerOrIndividualPerformanceDetails(milestoneId, feedbackType, set),
  setTerminateProject: async (projectId: string) => setTerminateProject(projectId, set),
  setWithdrawProject: async (projectId: string) => setWithdrawProject(projectId, set),
  setRelistProject: async (projectId: string, startDate: number, endDate: number) =>
    setRelistProject(projectId, startDate, endDate, set),

  setProjectInvitationRead: async (projectId: string) => setInvitationAsRead(projectId, set),
}));
