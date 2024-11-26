import { ProjectDetailsState, TeamMemberDetails } from '../constraints/types/project-details-types';
import {
  fetchTeamDetails,
  getPeerOrIndividualPerformanceDetailsService,
  getProjectInvitationDetailsService,
  getSelfOrTeamPerformanceDetailsService,
} from '../services/project-details';
import { getProjectDetailsById } from '../services/project-management-v2';

export const populateTeamDetails = async (set: any, projectId: string): Promise<void> => {
  set({ isTeamDetailsLoading: true });
  const teamDetails = await fetchTeamDetails(projectId);

  set((state: ProjectDetailsState) => ({
    ...state,
    teamDetails: teamDetails.map(
      (member: any): TeamMemberDetails => ({
        id: member._id,
        name: member?.first_name + ' ' + member?.last_name || '',
        profileImage: member?.image_uri || '',
        designation: member?.role_name || '',
        averageRating: member?.averageRating,
        appreciationScore: member?.appreciation_score,
      }),
    ),
    isTeamDetailsLoading: false,
  }));
};

export const getProjectDetails = async (projectId: string, set: any) => {
  set({ isProjectsLoading: true });
  const res: any = await getProjectDetailsById(projectId);
  set({ projectDetails: res, isProjectsLoading: false });
};

export const getProjectInvitationDetails = async (projectId: string, set: any) => {
  set({ isProjectInvitationDetailsLoading: true });
  const res: any = await getProjectInvitationDetailsService(projectId);
  set({ projectInvitationDetails: res, isProjectInvitationDetailsLoading: false });
};

export const getSelfOrTeamPerformanceDetails = async (projectId: string, feedbackType: string, set: any) => {
  set({ isPerformanceDetailsLoading: true });
  const res: any = await getSelfOrTeamPerformanceDetailsService(projectId, feedbackType);
  set({ performanceDetails: res, isPerformanceDetailsLoading: false });
};

export const getPeerOrIndividualPerformanceDetails = async (milestoneId: string, feedbackType: string, set: any) => {
  set({ isPerformanceDetailsLoading: true });
  const res: any = await getPeerOrIndividualPerformanceDetailsService(milestoneId, feedbackType);
  set({ performanceDetails: res, isPerformanceDetailsLoading: false });
};
