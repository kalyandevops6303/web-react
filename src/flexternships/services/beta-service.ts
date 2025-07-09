import axios from 'axios';
import { parseFeedbackSkeletons, parseFeedbackStatus } from '@flexternships/utils/parsing-utils';
import { routes } from '@flexternships/utils/api';
import { appendAuthToken } from '@flexternships/utils/local-storage';
import { handleError } from '@flexternships/utils/error-utils';
import { FeedbackData } from '@/flexternships/constraints/types/beta-feedback-types';
/**
 * Fetches the feedback skeletons from the API.
 * @returns A Promise that resolves to the feedback skeletons.
 */
export const getFeedbackSkeletonsService = async () => {
  const config = { withCredentials: true };
  try {
    const response = await axios.get(routes.projectManagementV2.internalAdmin.getFeedbackSkeletons, config);
    // const response = mockFeedbackSkeletons;
    return parseFeedbackSkeletons(response.data.data);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching feedback skeletons');
  }
};

/**
 * Fetches the feedback status for a specific milestone.
 * @param milestoneId - The ID of the milestone to get feedback status for.
 * @returns A Promise that resolves to the feedback status data or undefined.
 * @throws {Error} If the feedback status retrieval fails or an unexpected error occurs.
 */
export const getFeedbackStatusService = async (milestoneId: string) => {
  const config = { withCredentials: true };
  try {
    const response = await axios.get(routes.projectManagementV2.internalAdmin.getFeedbackStatus, {
      ...config,
      params: {
        milestone_id: milestoneId,
      },
    });
    return parseFeedbackStatus(response.data.data);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching feedback status');
  }
};

/**
 * Submits milestone feedback.
 * @param formData - The feedback form data to submit.
 * @returns A Promise that resolves to the submission response data or undefined.
 * @throws {Error} If the feedback submission fails or an unexpected error occurs.
 */
export const submitMilestoneFeedbackService = async (formData: FeedbackData) => {
  const headers = appendAuthToken({});
  try {
    const response = await axios.post(routes.projectManagementV2.internalAdmin.submitMilestoneFeedback, formData, {
      headers,
      withCredentials: true,
    });
    return response.data?.data || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while submitting milestone feedback');
  }
};

/**
 * Fetches the feedback draft for a specific milestone.
 * @param milestoneId - The ID of the milestone to get feedback draft for.
 * @returns A Promise that resolves to the feedback draft data or undefined.
 * @throws {Error} If the feedback draft retrieval fails or an unexpected error occurs.
 */
export const getFeedbackDraftService = async (milestoneId: string) => {
  const params = {
    milestone_id: milestoneId,
  };
  const config = { withCredentials: true, params };
  try {
    const response = await axios.get(routes.projectManagementV2.internalAdmin.getFeedbackDraft, config);
    return response.data?.data || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching feedback draft');
  }
};

/**
 * Submits the feedback draft for a specific milestone.
 * @param formData - The feedback form data to submit.
 * @returns A Promise that resolves to the submission response data or undefined.
 * @throws {Error} If the feedback submission fails or an unexpected error occurs.
 */
export const submitFeedbackDraftService = async (formData: FeedbackData) => {
  const headers = appendAuthToken({});
  try {
    const response = await axios.put(routes.projectManagementV2.internalAdmin.submitFeedbackDraft, formData, {
      headers,
      withCredentials: true,
    });
    return response.data?.data || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while submitting feedback draft');
  }
};
