import axios from 'axios';
import { appendAuthToken } from '../utils/local-storage';
import { handleError } from '../utils/error-utils';
import { routes } from '../utils/api';

/**
 * Fetches the team details for a project
 * @param projectId The ID of the project to fetch the team details for
 * @returns The team details for the project
 */
export const fetchTeamDetails = async (projectId: string) => {
  const headers = appendAuthToken({});
  const config = { headers };
  try {
    const response = await axios.get(
      `${routes.projectManagementV2.project.getProjectTeamDetails}?project_id=${projectId}`,
      config,
    );
    return response?.data?.data;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching team details');
  }
};

export const getProjectInvitationDetailsService = async (projectId: string) => {
  const headers = appendAuthToken({});
  const config = { headers };

  try {
    const response = await axios.get(
      `${routes.projectManagementV2.project.getProjectInvitationDetails}?project_id=${projectId}`,
      config,
    );
    return response?.data?.data;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occured while fetching project invitation details');
  }
};
