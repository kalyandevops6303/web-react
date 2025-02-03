import { ProjectSecondaryStatus } from '../constraints/enums/core-enums';
import { ProjectDetailsState, ProjectInvitation, TeamMemberDetails } from '../constraints/types/project-details-types';
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
        email: member?.user_email,
        invitedOn: member?.invited_on,
        averageRating: member?.averageRating,
        appreciationScore: member?.appreciation_score,
        isDocumentsSigned: member?.is_documents_signed,
      }),
    ),
    isTeamDetailsLoading: false,
  }));
};

export const getProjectDetails = async (
  projectId: string,
  set: any,
  onSuccessBySecondaryStatus?: (secondaryStatus: ProjectSecondaryStatus, isDocumentsNeeded: boolean) => void,
) => {
  set({ isProjectsLoading: true });
  const res = await getProjectDetailsById(projectId);
  set({ projectDetails: res, isProjectsLoading: false });
  if (onSuccessBySecondaryStatus && res?.secondaryStatus?.next) {
    onSuccessBySecondaryStatus(res.secondaryStatus.next, res.isDocumentsNeeded ?? false);
  }
};

export const getProjectInvitationDetails = async (projectId: string, set: (state: any) => void) => {
  set({ isProjectInvitationDetailsLoading: true });

  try {
    const res = await getProjectInvitationDetailsService(projectId);
    const projectInvitation: ProjectInvitation = {
      invitationExists: res.invitation_exists,
      createdAt: res.created_at,
      projectStartDate: res.project_start_date,
      projectEstimatedDuration: {
        duration: res.project_estimated_duration.duration,
        durationType: res.project_estimated_duration.duration_type,
        hoursPerWeek: res.project_estimated_duration.hours_per_week,
      },
      talentRole: res.talent_role,
      invitationMessage: res.invitation_message,
      isRead: res.is_read,
    };

    set({ projectInvitationDetails: projectInvitation, isProjectInvitationDetailsLoading: false });
  } catch (error) {
    console.error('Error fetching project invitation details:', error);
    set({ isProjectInvitationDetailsLoading: false });
  }
};

export const getSelfOrTeamPerformanceDetails = async (projectId: string, feedbackType: string, set: any) => {
  set({ isPerformanceDetailsLoading: true });
  const res = await getSelfOrTeamPerformanceDetailsService(projectId, feedbackType);
  console.log(res);
  set({ performanceDetails: res, isPerformanceDetailsLoading: false });
};

export const getPeerOrIndividualPerformanceDetails = async (milestoneId: string, feedbackType: string, set: any) => {
  set({ isPerformanceDetailsLoading: true });
  const res = await getPeerOrIndividualPerformanceDetailsService(milestoneId, feedbackType);
  console.log(res);
  set({ performanceDetails: res, isPerformanceDetailsLoading: false });
};

export const setInvitationAsRead = async (projectId: string, set: any) => {
  set({ isProjectInvitationDetailsLoading: true });
  await getProjectInvitationDetailsService(projectId);
  set({ isProjectInvitationDetailsLoading: false });
};
