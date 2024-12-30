import axios from 'axios';
import { routes } from '@flexternships/utils/api';
import { appendAuthToken } from '@flexternships/utils/local-storage';
import { handleError } from '@flexternships/utils/error-utils';
import { ChartConfig } from '../app/components/ui/chart';
import { keysToCamelCase } from '../utils/core-utils';

export const getIndividualOverviewService: (userId: string) => Promise<any> = async (userId) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      user_id: userId,
    },
  };

  try {
    // const response = await axios.get(`${routes.analytics.individualOverview}`, config);
    // return response.data?.data || undefined;
    return {
      userId: '123',
      firstName: 'John',
      lastName: 'Doe',
      role: 'Software Engineer',
      imageUri: 'https://github.com/shadcn.png',
      education: {
        name: 'Bachelor of Technology',
        startYear: '2020',
        endYear: '2024',
        institution: 'IIT Bombay',
      },
      flexternshipStartDate: 1734688019281,
      flexternshipEndDate: 1742464019281,
      wowCount: 10,
      kudosCount: 20,
      trumioAttractivenessScore: 82,
      hardSkillsPre: 8,
      hardSkillsPost: 10,
      managerFeedback: {
        score: 8,
        total: 10,
      },
      peerFeedback: {
        score: 5,
        total: 10,
      },
      overallComments: 42,
    };
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching individual overview');
  }
};

export const getProjectsListService: () => Promise<any> = async () => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
  };
  try {
    // const response = await axios.get(`${routes.dashboardV2.clientDetails.getClientCompletedProjects}`, config);
    // return response.data?.data || undefined;
    return [
      {
        id: '67716ee4125cc4d7138d6a73',
        name: 'Project 1',
      },
    ];
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching projects list');
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
    // const response = await axios.get(`${routes.analytics.individualOverview}`, config);
    // return response.data?.data || undefined;
    return {
      summary: 'This is a summary of the AI',
    };
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching AI summary');
  }
};
