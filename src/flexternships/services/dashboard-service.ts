import axios from 'axios';
import { routes } from '@flexternships/utils/api';
import { appendAuthToken } from '@flexternships/utils/local-storage';
import { handleError } from '@flexternships/utils/error-utils';

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
    params: {
      user_id: clientUserId,
    },
  };

  try {
    const response = await axios.get(routes.dashboardV2.clientDetails.getClientPublicDetails, config);
    const data = response?.data?.data;

    return data;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while retrieving client public details');
  }
};
