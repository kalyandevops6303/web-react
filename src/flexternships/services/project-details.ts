import axios from 'axios';
import { appendAuthToken } from '../utils/local-storage';
import { handleError } from '../utils/error-utils';
import { routes } from '../utils/api';

export const fetchTeamDetails = async (projectId: string) => {
  const headers = appendAuthToken({});
  const config = { headers };
  try {
    const response = await axios.get(`${routes.projectDetails.teamDetails}?project_id=${projectId}`, config);
    return response?.data?.data;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching team details');
  }
};
