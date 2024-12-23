import axios from 'axios';
import { routes } from '@flexternships/utils/api';
import { appendAuthToken } from '@flexternships/utils/local-storage';
import { handleError } from '@flexternships/utils/error-utils';
import { parseClientCompletedProjects, parseClientPublicDetails } from '../utils/parsing-utils';
import { UserType } from '../constraints/enums/core-enums';

/**
 * Retrieves public details for a client user.
 * @param clientUserId - The ID of the client user to retrieve details for.
 * @returns A Promise that resolves to the client's public details or undefined.
 * @throws {Error} If the client details retrieval fails or an unexpected error occurs.
 */
export const getClientPublicDetails = async (clientUserId: string) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    withCredentials: true,
  };

  try {
    const response = await axios.get(
      `${routes.dashboardV2.clientDetails.getClientPublicDetails}/${clientUserId}`,
      config,
    );
    const data = response?.data?.data;

    return parseClientPublicDetails(data);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while retrieving client public details');
  }
};

/**
 * Retrieves completed projects for a client user.
 * @param clientUserId - The ID of the client user to retrieve projects for.
 * @returns A Promise that resolves to the client's completed projects or undefined.
 * @throws {Error} If the projects retrieval fails or an unexpected error occurs.
 */
export const getClientCompletedProjects = async (clientUserId: string, page: number = 1, pageSize: number = 10) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      entity: UserType.CLIENT,
      page,
      page_size: pageSize,
    },
    withCredentials: true,
  };

  try {
    const response = await axios.get(
      `${routes.dashboardV2.clientDetails.getClientCompletedProjects}/${clientUserId}`,
      config,
    );
    const data = response?.data?.data;

    return parseClientCompletedProjects(data);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while retrieving client projects');
  }
};
