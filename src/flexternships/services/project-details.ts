/**
 * Project details service module for handling project-related operations.
 * @fileoverview Contains functions for managing project teams, invitations, and other project-related data.
 * Includes APIs for fetching team details, project invitations, and other project operations.
 * @module project-details
 */

import axios from 'axios';
import { appendAuthToken } from '../utils/local-storage';
import { handleError } from '../utils/error-utils';
import { routes } from '../utils/api';
import API from '@/configs/api';
import { parseFlexternComments } from '../utils/parsing-utils';
import { PaginatedData } from '../constraints/types/core-types';

/**
 * Fetches the team details for a project
 * @param projectId The ID of the project to fetch the team details for
 * @returns Promise that resolves to the team details for the project or undefined
 * @throws {Error} If team details retrieval fails or an unexpected error occurs
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

/**
 * Gets project invitation details
 * @param projectId The ID of the project to get invitation details for
 * @returns Promise that resolves to the project invitation details or undefined
 * @throws {Error} If invitation details retrieval fails or an unexpected error occurs
 */
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

/**
 * Marks a project invitation as read
 * @param projectId The ID of the project whose invitation should be marked as read
 * @throws {Error} If marking invitation as read fails or an unexpected error occurs
 */
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

/**
 * Gets self or team performance details for a project
 * @param projectId The ID of the project to get performance details for
 * @param feedbackType The type of feedback to retrieve
 * @returns Promise that resolves to the performance details or undefined
 * @throws {Error} If performance details retrieval fails or an unexpected error occurs
 */
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

/**
 * Gets peer or individual performance details for a milestone
 * @param milestoneId The ID of the milestone to get performance details for
 * @param feedbackType The type of feedback to retrieve
 * @returns Promise that resolves to the performance details or undefined
 * @throws {Error} If performance details retrieval fails or an unexpected error occurs
 */
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

/**
 * Gets comments for a flextern on a project
 * @param projectId The ID of the project to get comments for
 * @param talentUserId The ID of the talent user (flextern) to get comments for
 * @param page The page number for pagination (default: 1)
 * @param pageSize The number of items per page (default: 5)
 * @returns Promise that resolves to the parsed flextern comments or undefined
 * @throws {Error} If comments retrieval fails or an unexpected error occurs
 */
export const getFlexternComments = async (
  projectId: string,
  talentUserId: string,
  page: number = 1,
  pageSize: number = 5,
  appRoleId: string = '',
) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      project_id: projectId,
      talent_user_id: talentUserId,
      page,
      page_size: pageSize,
      app_role_id: appRoleId,
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

/**
 * Gets the count of comments for a flextern on a project
 * @param projectId The ID of the project to get comment count for
 * @param talentUserId The ID of the talent user (flextern) to get comment count for
 * @returns Promise that resolves to the comment count or undefined
 * @throws {Error} If comment count retrieval fails or an unexpected error occurs
 */
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

/**
 * Gets the paginated list of flextern roles.
 * @param page - The page number to retrieve.
 * @param pageSize - The number of items per page.
 * @param options - Optional options to append "All Flextern Roles" option.
 * @returns A Promise that resolves to the paginated flextern roles data.
 * @throws {Error} If the flextern roles retrieval fails or an unexpected error occurs.
 */
export const getPaginatedFlexternRoles = async (page: number = 1, pageSize: number = 10): Promise<PaginatedData> => {
  const emptyData = {
    metadata: {
      current_page: page,
      page_size: pageSize,
      total_records: 0,
      has_next_page: false,
    },
    data: [],
  };

  const config = {
    params: {
      page,
      page_size: pageSize,
    },
    withCredentials: true,
  };

  try {
    const response = await axios.get(routes.dashboardV2.flexternRoles.getPaginatedFlexternRoles, config);
    return response.data.data;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching flextern roles');
  }
  return emptyData;
};
