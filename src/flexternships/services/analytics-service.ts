import axios from 'axios';
import { routes } from '@flexternships/utils/api';
import { appendAuthToken } from '@flexternships/utils/local-storage';
import { handleError } from '@flexternships/utils/error-utils';
import { ChartConfig } from '../app/components/ui/chart';

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
        id: 1,
        name: 'Project 1',
      },
      {
        id: 2,
        name: 'Project 2',
      },
    ];
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching projects list');
  }
};

export const getRecognitionChartDataService: (projectId: string) => Promise<any> = async (projectId) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      project_id: projectId,
    },
  };
  try {
    // const response = await axios.get(`${routes.analytics.individualOverview}`, config);
    // return response.data?.data || undefined;
    return {
      chartData: [
        {
          milestone: '',
          trumioAttractivenessScore: 0,
          wowCount: 0,
          kudosCount: 0,
        },
        {
          milestone: 'Milestone 1',
          trumioAttractivenessScore: 40,
          wowCount: 4,
          kudosCount: 8,
        },
        {
          milestone: 'Milestone 2',
          trumioAttractivenessScore: 60,
          wowCount: 3,
          kudosCount: 7,
        },
        {
          milestone: 'Milestone 3',
          trumioAttractivenessScore: 88,
          wowCount: 7,
          kudosCount: 5,
        },
        {
          milestone: 'Milestone 4',
          trumioAttractivenessScore: 90,
          wowCount: 2,
          kudosCount: 8,
        },
        {
          milestone: 'Milestone 5',
          trumioAttractivenessScore: 92,
          wowCount: 1,
          kudosCount: 4,
        },
      ],
      chartConfig: {
        trumioAttractivenessScore: {
          label: 'Attractiveness',
          color: '#0185E4',
        },
      },
      maxYAxis: 100,
    };
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching recognition chart data');
  }
};

export const getPerformanceChartDataService: (projectId: string) => Promise<any> = async (projectId) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      project_id: projectId,
    },
  };
  try {
    // const response = await axios.get(`${routes.analytics.individualOverview}`, config);
    // return response.data?.data || undefined;
    return {
      chartData: [
        {
          milestone: '',
          collaboration: 0,
          communication: 0,
          leadership: 0,
          effectiveness: 0,
          problemSolving: 0,
          innovation: 0,
        },
        {
          milestone: 'Milestone 1',
          collaboration: 7,
          communication: 3,
          leadership: 4,
          effectiveness: 6,
          problemSolving: 5,
          innovation: 2,
        },
        {
          milestone: 'Milestone 2',
          collaboration: 4,
          communication: 8,
          leadership: 5,
          effectiveness: 3,
          problemSolving: 7,
          innovation: 6,
        },
        {
          milestone: 'Milestone 3',
          collaboration: 9,
          communication: 5,
          leadership: 7,
          effectiveness: 8,
          problemSolving: 4,
          innovation: 3,
        },
        {
          milestone: 'Milestone 4',
          collaboration: 3,
          communication: 7,
          leadership: 8,
          effectiveness: 5,
          problemSolving: 9,
          innovation: 4,
        },
        {
          milestone: 'Milestone 5',
          collaboration: 8,
          communication: 6,
          leadership: 3,
          effectiveness: 7,
          problemSolving: 5,
          innovation: 8,
        },
      ],
      chartConfig: {
        collaboration: {
          label: 'Collaboration',
          color: '#0185E4',
        },
        communication: {
          label: 'Communication',
          color: '#EA5455',
        },
        leadership: {
          label: 'Leadership',
          color: '#FBC02D',
        },
        effectiveness: {
          label: 'Effectiveness',
          color: '#28C76F',
        },
        problemSolving: {
          label: 'Problem Solving',
          color: '#7167F0',
        },
        innovation: {
          label: 'Innovation',
          color: '#00CFE8',
        },
      } satisfies ChartConfig,
      maxYAxis: 10,
    };
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
