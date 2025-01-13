import axios from 'axios';
import { routes } from '@flexternships/utils/api';
import { appendAuthToken } from '@flexternships/utils/local-storage';
import { handleError } from '@flexternships/utils/error-utils';
import { keysToCamelCase } from '../utils/core-utils';

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
