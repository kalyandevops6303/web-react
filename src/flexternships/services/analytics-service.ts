/**
 * Analytics service module for handling analytics-related operations.
 * @fileoverview Contains functions for managing analytics data, including individual overviews,
 * performance metrics, team statistics, and competency insights.
 * Includes APIs for retrieving various analytics metrics and generating insights.
 * @module analytics-service
 */

import axios from 'axios';
import { routes } from '@flexternships/utils/api';
import { appendAuthToken } from '@flexternships/utils/local-storage';
import { handleError } from '@flexternships/utils/error-utils';
import { keysToCamelCase } from '../utils/core-utils';
import { parseDetailedPerformanceInsights, parseTeamCompetencySummary } from '../utils/parsing-utils';
import { DetailedPerformanceInsights, TeamCompetencySummary } from '../constraints/types/analytics-types';
import { GithubMetricType, TimePeriodOptions } from '../constraints/enums/analytics-enums';

/**
 * Retrieves individual overview data for a user and project.
 * @param userId - The ID of the user to get overview for
 * @param projectId - The ID of the project to get overview for
 * @returns Promise resolving to the individual overview data or undefined
 * @throws {Error} If the overview retrieval fails
 */
export const getIndividualOverviewService: (userId: string, projectId: string) => Promise<any> = async (
  userId,
  projectId,
) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      user_id: userId,
      project_id: projectId,
    },
    withCredentials: true,
  };

  try {
    const response = await axios.get(`${routes.analytics.individualOverview}`, config);
    return keysToCamelCase(response.data?.data) || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching individual overview');
  }
};

/**
 * Retrieves recognition chart data for a project and user.
 * @param projectId - The ID of the project
 * @param userId - The ID of the user
 * @returns Promise resolving to the recognition chart data or undefined
 * @throws {Error} If the chart data retrieval fails
 */
export const getRecognitionChartDataService: (projectId: string, userId: string) => Promise<any> = async (
  projectId,
  userId,
) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      project_id: projectId,
      user_id: userId,
    },
    withCredentials: true,
  };
  try {
    const response = await axios.get(`${routes.analytics.recognitionChart}`, config);
    return keysToCamelCase(response.data?.data) || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching recognition chart data');
  }
};

/**
 * Retrieves performance chart data for a project and user.
 * @param projectId - The ID of the project
 * @param userId - The ID of the user
 * @returns Promise resolving to the performance chart data or undefined
 * @throws {Error} If the chart data retrieval fails
 */
export const getPerformanceChartDataService: (projectId: string, userId: string) => Promise<any> = async (
  projectId,
  userId,
) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      project_id: projectId,
      user_id: userId,
    },
    withCredentials: true,
  };
  try {
    const response = await axios.get(`${routes.analytics.performanceChart}`, config);
    return keysToCamelCase(response.data?.data) || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching performance chart data');
  }
};

/**
 * Retrieves AI-generated summary for a project and user.
 * @param projectId - The ID of the project
 * @param userId - The ID of the user
 * @returns Promise resolving to the AI summary data or undefined
 * @throws {Error} If the summary retrieval fails
 */
export const getAiSummaryService: (projectId: string, userId: string) => Promise<any> = async (projectId, userId) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      project_id: projectId,
      user_id: userId,
    },
    withCredentials: true,
  };
  try {
    const response = await axios.get(`${routes.analytics.aiSummary}`, config);
    return response.data?.data || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching AI summary');
  }
};

/**
 * Retrieves performance summary data for a team in a project.
 * @param projectId - The ID of the project
 * @returns Promise resolving to the team performance summary data or undefined
 * @throws {Error} If the summary retrieval fails
 */
export const getTeamPerformanceSummaryService: (projectId: string) => Promise<any> = async (projectId) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      project_id: projectId,
    },
    withCredentials: true,
  };
  try {
    const response = await axios.get(`${routes.analytics.team.performanceSummary}`, config);
    return keysToCamelCase(response.data?.data) || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching team performance summary');
  }
};

/**
 * Retrieves attractiveness details for team members in a project.
 * @param projectId - The ID of the project
 * @returns Promise resolving to the team members' attractiveness details or undefined
 * @throws {Error} If the details retrieval fails
 */
export const getTeamMembersAttractivenessDetailsService: (projectId: string) => Promise<any> = async (projectId) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: { project_id: projectId },
    withCredentials: true,
  };
  try {
    const response = await axios.get(`${routes.analytics.team.teamMembersAttractivenessDetails}`, config);
    return keysToCamelCase(response.data?.data) || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching team members details');
  }
};

/**
 * Retrieves team leaderboard data for a project.
 * @param projectId - The ID of the project
 * @returns Promise resolving to the team leaderboard data or undefined
 * @throws {Error} If the leaderboard retrieval fails
 */
export const getTeamLeaderboardService: (projectId: string) => Promise<any> = async (projectId) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: { project_id: projectId },
    withCredentials: true,
  };
  try {
    const response = await axios.get(`${routes.analytics.team.teamLeaderboard}`, config);
    return keysToCamelCase(response.data?.data) || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching team leaderboard');
  }
};

/**
 * Retrieves team roles data for a project.
 * @param projectId - The ID of the project
 * @returns Promise resolving to the team roles data or undefined
 * @throws {Error} If the roles retrieval fails
 */
export const getTeamRolesService: (projectId: string) => Promise<any> = async (projectId) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: { project_id: projectId },
    withCredentials: true,
  };
  try {
    const response = await axios.get(`${routes.analytics.team.roles}`, config);
    return keysToCamelCase(response.data?.data, 1) || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching team roles');
  }
};

/**
 * Retrieves team universities data for a project.
 * @param projectId - The ID of the project
 * @returns Promise resolving to the team universities data or undefined
 * @throws {Error} If the universities retrieval fails
 */
export const getTeamUniversitiesService: (projectId: string) => Promise<any> = async (projectId) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: { project_id: projectId },
    withCredentials: true,
  };
  try {
    const response = await axios.get(`${routes.analytics.team.universities}`, config);
    return keysToCamelCase(response.data?.data, 1) || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching team universities');
  }
};

/**
 * Retrieves team diversity data for a project.
 * @param projectId - The ID of the project
 * @returns Promise resolving to the team diversity data or undefined
 * @throws {Error} If the diversity data retrieval fails
 */
export const getTeamDiversityService: (projectId: string) => Promise<any> = async (projectId) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: { project_id: projectId },
    withCredentials: true,
  };
  try {
    const response = await axios.get(`${routes.analytics.team.diversity}`, config);
    return keysToCamelCase(response.data?.data, 1) || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching team diversity');
  }
};

/**
 * Retrieves detailed information about team members for a project.
 * @param projectId - The ID of the project
 * @returns Promise resolving to the team members' details or undefined
 * @throws {Error} If the details retrieval fails
 */
export const getTeamMembersDetailsService: (projectId: string) => Promise<any> = async (projectId) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: { project_id: projectId },
    withCredentials: true,
  };
  try {
    const response = await axios.get(`${routes.analytics.team.teamMembersDetails}`, config);
    return keysToCamelCase(response.data?.data) || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching team members details');
  }
};

/**
 * Retrieves performance insights overview for a team in a project.
 * @param projectId - The ID of the project
 * @returns Promise resolving to the team performance insights overview or undefined
 * @throws {Error} If the overview retrieval fails
 */
export const getTeamPerformanceInsightsOverviewService: (projectId: string) => Promise<any> = async (projectId) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: { project_id: projectId },
    withCredentials: true,
  };
  try {
    const response = await axios.get(`${routes.analytics.team.performanceInsightsOverview}`, config);
    return keysToCamelCase(response.data?.data) || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching team performance insights overview');
  }
};

/**
 * Retrieves detailed performance insights for a project and competency.
 * @param projectId - The ID of the project
 * @param competencyAbbreviation - The abbreviation code for the competency
 * @returns Promise resolving to the detailed performance insights or undefined
 * @throws {Error} If the insights retrieval fails
 */
export const getDetailedPerformanceInsightsService = async (
  projectId: string,
  competencyAbbreviation: string,
): Promise<DetailedPerformanceInsights | undefined> => {
  const config = {
    params: {
      project_id: projectId,
      competency_abbreviation: competencyAbbreviation,
    },
    withCredentials: true,
  };

  try {
    const response = await axios.get(`${routes.analytics.detailedPerformanceInsights}`, config);
    return parseDetailedPerformanceInsights(response.data.data);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching detailed performance insights');
  }
};

/**
 * Retrieves team competency summary for a project.
 * @param projectId - The ID of the project
 * @param competency_id - Optional ID of specific competency to filter by
 * @returns Promise resolving to the team competency summary data or undefined
 * @throws {Error} If the summary retrieval fails or an unexpected error occurs
 */
export const getTeamCompetencySummaryService = async (
  projectId: string,
  competency_id?: string,
): Promise<TeamCompetencySummary[] | undefined> => {
  const config = {
    params: {
      project_id: projectId,
      competency_id: competency_id,
    },
    withCredentials: true,
  };

  try {
    const response = await axios.get(`${routes.analytics.teamCompetencySummary}`, config);
    return parseTeamCompetencySummary(response.data.data);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching team competency summary');
  }
};

export const getConversationParticipationService = async (
  projectId: string,
  userId: string,
  messagesCountState: TimePeriodOptions,
  participationPercentageState: TimePeriodOptions,
) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      project_id: projectId,
      user_id: userId,
      messages_count: messagesCountState,
      participation_percentage: participationPercentageState,
    },
    withCredentials: true,
  };
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          messagesCount: 6,
          participationPercentage: 60,
          frequencyOfMessagesMinutes: 10,
          averageResponseTimeMinutes: 10,
        });
      }, 800); // 800ms delay
    });
    // const response = await axios.get(`${routes.analytics.conversationParticipation}`, config);
    // return keysToCamelCase(response.data?.data) || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching conversation participation');
  }
};

export const getConversationParticipationFilesService = async (projectId: string, userId: string) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: { project_id: projectId, user_id: userId },
    withCredentials: true,
  };
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalFilesShared: 10,
          documents: {
            count: 5,
            percentage: 50,
          },
          links: {
            count: 5,
            percentage: 50,
          },
        });
      }, 800); // 800ms delay
    });
    // const response = await axios.get(`${routes.analytics.conversationParticipationFiles}`, config);
    // return keysToCamelCase(response.data?.data) || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching conversation participation files');
  }
};

export const getCommitsService = async (
  projectId: string,
  userId: string,
  options: { metricType: GithubMetricType; page: number; pageSize: number } = {
    metricType: GithubMetricType.COMMITS,
    page: 1,
    pageSize: 10,
  },
) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: { page: options.page, page_size: options.pageSize },
    withCredentials: true,
  };
  const payload = {
    project_id: projectId,
    user_id: userId,
    metric_type: options.metricType,
  };
  try {
    // const response = await axios.post(`${routes.analytics.commits}`, payload, config);
    // return keysToCamelCase(response.data?.data) || undefined;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          commits: 100,
          issues: 90,
          pullRequests: 80,
          projectName: 'Usage Data Collection and Payment',
          githubUrl: 'https://github.com/flexternships/flexternships-frontend',
        });
      }, 800); // 800ms delay
    });
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching commits');
  }
};

export const getBranchHistoryService = async (projectId: string, userId: string) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: { project_id: projectId, user_id: userId },
    withCredentials: true,
  };
  try {
    // const response = await axios.get(`${routes.analytics.branchHistory}`, config);
    // return keysToCamelCase(response.data?.data) || undefined;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            firstName: 'John',
            lastName: 'Doe',
            imageUri: 'https://github.com/flexternships/flexternships-frontend/blob/main/public/images/user.png',
            role: 'Developer',
            commitEpoch: 1716604800000,
            commitMessage:
              'Added new feature to the project djhkajdkaj akjshkajs  kajshkajskjah  ashkajskjaksjhakjhskaj kjahskjahks kajshkajs kajsha ksjh ',
          },
          {
            firstName: 'Jane',
            lastName: 'Doe',
            imageUri: 'https://github.com/flexternships/flexternships-frontend/blob/main/public/images/user.png',
            role: 'ML Engineer',
            commitEpoch: 1716604100000,
            commitMessage: 'Added new feature to the project',
          },
          {
            firstName: 'David',
            lastName: 'Gilmour',
            imageUri: 'https://github.com/flexternships/flexternships-frontend/blob/main/public/images/user.png',
            role: 'Data Scientist',
            commitEpoch: 1716607800000,
            commitMessage: 'Added new feature to the project',
          },
        ]);
      }, 800); // 800ms delay
    });
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching branch history');
  }
};
