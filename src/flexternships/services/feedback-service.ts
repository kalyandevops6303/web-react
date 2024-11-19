import axios from 'axios';
import { routes } from '@flexternships/utils/api';
import { appendAuthToken } from '@flexternships/utils/local-storage';
import { handleError } from '@flexternships/utils/error-utils';

export const getMilestoneFeedbackInfoService: (projectId: string, feedbackType: string) => Promise<any> = async (projectId, feedbackType) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      project_id: projectId,
      feedback_type: feedbackType,
    },
  };

  try {
    const response = await axios.get(`${routes.projectManagementV2.feedback.milestoneFeedbackInfo}`, config);
    return response.data?.data || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching feedback details');
  }
};