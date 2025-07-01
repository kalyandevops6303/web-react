/**
 * Dashboard service module for handling dashboard-related operations.
 * @fileoverview Contains functions for managing dashboard data including client details and project history.
 * Includes APIs for retrieving client public profiles, completed projects, and other dashboard metrics.
 * @module dashboard-service
 */

import axios from 'axios';
import { routes } from '@flexternships/utils/api';
import { appendAuthToken } from '@flexternships/utils/local-storage';
import { handleError } from '@flexternships/utils/error-utils';
import { parseClientCompletedProjects, parseClientPublicDetails, parseDashboardProjects } from '../utils/parsing-utils';
import { ProjectPrimaryStatus, UserType } from '../constraints/enums/core-enums';

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

/**
 * Retrieves projects for a client user.
 * @param page - The page number to retrieve.
 * @param pageSize - The number of projects to retrieve per page.
 * @returns A Promise that resolves to the client's projects or undefined.
 * @throws {Error} If the projects retrieval fails or an unexpected error occurs.
 */
export const getProjects = async (page: number = 1, pageSize: number = 10, projectStatus?: ProjectPrimaryStatus) => {
  const config = {
    params: {
      page,
      page_size: pageSize,
      project_status: projectStatus,
    },
    withCredentials: true,
  };

  try {
    const response = await axios.get(routes.dashboardV2.projects.getProjects, config);
    const data = response?.data?.data;

    return parseDashboardProjects(data);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while retrieving projects');
    return {
      metadata: {
        currentPage: 1,
        pageSize: 10,
        totalRecords: 0,
        hasNextPage: false,
      },
      data: [],
    };
  }
};

export const markProjectAsRead = async (projectId: string, projectStatus: ProjectPrimaryStatus) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    withCredentials: true,
  };

  const body = {
    metadata: {
      project_id: projectId,
    },
    type: `${projectStatus}_PROJECTS`,
    status: 'READ',
  };

  try {
    const response = await axios.post(routes.dashboardV2.projects.markProjectAsRead, body, config);
    return response;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while marking project as read');
  }
};
