import {  FlexternProjectDetails, TeamMemberDetails } from '../constraints/types/project-details-types';
import { fetchTeamDetails } from '../services/project-details';

export const populateTeamDetails = async (set: any, projectId: string): Promise<void> => {
  const teamDetails = await fetchTeamDetails(projectId);

  set((state: FlexternProjectDetails) => ({
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
