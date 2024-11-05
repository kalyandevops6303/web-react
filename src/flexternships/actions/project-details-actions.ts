import {  ProjectDetailsState, TeamMemberDetails } from '../constraints/types/project-details-types';
import { fetchTeamDetails } from '../services/project-details';
import { getProjectDetailsById } from '../services/project-management-v2';

export const populateTeamDetails = async (set: any, projectId: string): Promise<void> => {
  const teamDetails = await fetchTeamDetails(projectId);

  set((state: ProjectDetailsState) => ({
    ...state,
    teamDetails: teamDetails.map(
      (member: any): TeamMemberDetails => ({
        name: member?.first_name +' '+member?.last_name || '',
        profileImage: member?.image_uri || '',
        designation: member?.role_name || '',
      })
    ),
  }));
};

export const getProjectDetails = async (projectId: string, set: any) => {
  set({ isProjectsLoading: true });
  const res:any = await getProjectDetailsById(projectId);
  set({ projectDetails: res, isProjectsLoading: false });
};