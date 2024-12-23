import axios from 'axios';
import { routes } from '@flexternships/utils/api';
import { appendAuthToken } from '@flexternships/utils/local-storage';
import { handleError } from '@flexternships/utils/error-utils';

export const getMilestoneFeedbackInfoService: (projectId: string, feedbackType: string) => Promise<any> = async (
  projectId,
  feedbackType,
) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      project_id: projectId,
      feedback_type: feedbackType,
    },
    withCredentials: true,
  };

  try {
    const response = await axios.get(`${routes.projectManagementV2.feedback.milestoneFeedbackInfo}`, config);
    return response.data?.data || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching feedback details');
  }
};

export const submitFeedbackService = async (formData: any): Promise<any> => {
  try {
    const headers = appendAuthToken({}) || {};
    const response = await axios.post(`${routes.projectManagementV2.feedback.submitFeedback}`, formData, {
      headers,
      withCredentials: true,
    });
    return response.data?.data || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while submitting feedback');
    throw error;
  }
};

export const getFeedbackResponseService: (
  receiverId: string,
  milestoneId: string,
  feedbackType: string,
) => Promise<any> = async (receiverId, milestoneId, feedbackType) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      receiver_id: receiverId,
      milestone_id: milestoneId,
      feedback_type: feedbackType,
    },
    withCredentials: true,
  };

  try {
    const response = await axios.get(`${routes.projectManagementV2.feedback.feedbackResponse}`, config);
    return response.data?.data || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching feedback details');
  }
};
