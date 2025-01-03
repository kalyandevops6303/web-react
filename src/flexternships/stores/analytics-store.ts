import { create } from 'zustand';
import { getIndividualOverview, getProjectsList, getThirdPartyAppsData } from '../actions/analytics-actions';
import { getPerformanceChartData, getRecognitionChartData } from '../actions/analytics-actions';
import { getAiSummary } from '../actions/analytics-actions';

const defaultInitState = {
  individualOverview: null,
  isIndividualOverviewLoading: false,
  projectsList: [],
  isProjectsListLoading: false,
  recognitionChartData: {
    chartData: [],
    chartConfig: {},
  },
  isRecognitionChartDataLoading: false,
  performanceChartData: {
    chartData: [],
    chartConfig: {},
  },
  isPerformanceChartDataLoading: false,
  aiSummary: null,
  isAiSummaryLoading: false,
  thirdPartyAppsData: null,
  isThirdPartyAppsDataLoading: false,
};

export const useAnalyticsStore = create<any>((set) => ({
  ...defaultInitState,
  getProjectsList: async () => getProjectsList(set),
  getRecognitionChartData: async (projectId: string, userId: string) => getRecognitionChartData(projectId, userId, set),
  getPerformanceChartData: async (projectId: string, userId: string) => getPerformanceChartData(projectId, userId, set),
  getAiSummary: async (projectId: string, userId: string) => getAiSummary(projectId, userId, set),
  getIndividualOverview: async (userId: string, projectId: string) => getIndividualOverview(userId, projectId, set),
  getThirdPartyAppsData: async (projectId: string, userId: string) => getThirdPartyAppsData(projectId, userId, set),
}));
