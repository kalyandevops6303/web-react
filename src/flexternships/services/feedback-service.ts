/**
 * @fileoverview Service module for handling feedback-related API calls.
 * Contains functions for retrieving and submitting milestone feedback information.
 * Includes APIs for getting milestone feedback details and submitting feedback responses.
 * @module feedback-service
 */

import axios from 'axios';
import { routes } from '@flexternships/utils/api';
import { appendAuthToken } from '@flexternships/utils/local-storage';
import { handleError } from '@flexternships/utils/error-utils';
import { parseFeedbackSkeletons, parseFeedbackStatus } from '@flexternships/utils/parsing-utils';

/**
 * Gets milestone feedback information for a project.
 * @param projectId - The ID of the project to get feedback info for.
 * @param feedbackType - The type of feedback to retrieve.
 * @returns A Promise that resolves to the milestone feedback data or undefined.
 * @throws {Error} If the feedback info retrieval fails or an unexpected error occurs.
 */
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

/**
 * Submits feedback for a milestone.
 * @param formData - The feedback form data to submit.
 * @returns A Promise that resolves to the submission response data or undefined.
 * @throws {Error} If the feedback submission fails or an unexpected error occurs.
 */
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

/**
 * Gets feedback response data for a specific receiver and milestone.
 * @param receiverId - The ID of the feedback receiver.
 * @param milestoneId - The ID of the milestone.
 * @param feedbackType - The type of feedback to retrieve.
 * @returns A Promise that resolves to the feedback response data or undefined.
 * @throws {Error} If the feedback response retrieval fails or an unexpected error occurs.
 */
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

/**
 * Fetches the feedback skeletons from the API.
 * @returns A Promise that resolves to the feedback skeletons.
 */
export const getFeedbackSkeletonsService = async () => {
  const config = { withCredentials: true };
  try {
    const response = await axios.get(routes.projectManagementV2.feedback.getFeedbackSkeletons, config);
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
    const response = await axios.get(routes.projectManagementV2.feedback.getFeedbackStatus, {
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
export const submitMilestoneFeedbackService = async (formData: any) => {
  const headers = appendAuthToken({});
  try {
    const response = await axios.post(routes.projectManagementV2.feedback.submitMilestoneFeedback, formData, {
      headers,
      withCredentials: true,
    });
    return response.data?.data || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while submitting milestone feedback');
  }
};
