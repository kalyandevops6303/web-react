import axios from 'axios';
import { routes } from '@flexternships/utils/api';
import { appendAuthToken } from '@flexternships/utils/local-storage';
import { handleError } from '@flexternships/utils/error-utils';
import { keysToCamelCase } from '../utils/core-utils';
import { parseDetailedPerformanceInsights, parseTeamCompetencySummary } from '../utils/parsing-utils';
import { DetailedPerformanceInsights, TeamCompetencySummary } from '../constraints/types/analytics-types';

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

export const getConversationParticipationService = async (projectId: string) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: { project_id: projectId },
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

export const getConversationParticipationFilesService = async (projectId: string) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: { project_id: projectId },
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
