import axios from 'axios';
import { appendAuthToken } from '../utils/local-storage';
import { handleError } from '../utils/error-utils';
import { routes } from '../utils/api';
import API from '@/configs/api';
import { parseFlexternComments } from '../utils/parsing-utils';

/**
 * Fetches the team details for a project
 * @param projectId The ID of the project to fetch the team details for
 * @returns The team details for the project
 */
export const fetchTeamDetails = async (projectId: string) => {
  const headers = appendAuthToken({});
  const config = { headers: headers, withCredentials: true };
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
  const config = { headers: headers, withCredentials: true };

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

export const markInvitationAsRead = async (projectId: string) => {
  const headers = appendAuthToken({});
  const config = { headers: headers, withCredentials: true };
  const data = { project_id: projectId, type: 'PROJECT_INVITATION' };

  try {
    await axios.post(`${API.dashboard.updateCardStatus}`, data, config);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occured while marking invitation as read');
  }
};

export const getSelfOrTeamPerformanceDetailsService = async (projectId: string, feedbackType: string) => {
  const headers = appendAuthToken({});
  const config = { headers: headers, withCredentials: true };

  try {
    const response = await axios.get(
      `${routes.projectManagementV2.project.getSelfOrTeamPerformanceDetails}?project_id=${projectId}&feedback_type=${feedbackType}`,
      config,
    );
    return response?.data?.data;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occured while fetching Performance Details');
  }
};

export const getPeerOrIndividualPerformanceDetailsService = async (milestoneId: string, feedbackType: string) => {
  const headers = appendAuthToken({});
  const config = { headers: headers, withCredentials: true };

  try {
    const response = await axios.get(
      `${routes.projectManagementV2.project.getPeerOrIndividualPerformanceDetails}?milestone_id=${milestoneId}&feedback_type=${feedbackType}`,
      config,
    );
    return response?.data?.data;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occured while fetching Performance Details');
  }
};

export const getFlexternComments = async (
  projectId: string,
  talentUserId: string,
  page: number = 1,
  pageSize: number = 5,
) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      project_id: projectId,
      talent_user_id: talentUserId,
      page,
      page_size: pageSize,
    },
    withCredentials: true,
  };

  try {
    const response = await axios.get(`${routes.dashboardV2.flexternComment.getFlexternComments}`, config);
    const data = response?.data?.data;
    return parseFlexternComments(data);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while retrieving comments');
  }
};

export const getFlexternCommentCount = async (projectId: string, talentUserId: string) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      project_id: projectId,
      talent_user_id: talentUserId,
    },
    withCredentials: true,
  };

  try {
    const response = await axios.get(`${routes.dashboardV2.flexternComment.getFlexternCommentCount}`, config);
    return response?.data?.data;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while retrieving comment count');
  }
};
