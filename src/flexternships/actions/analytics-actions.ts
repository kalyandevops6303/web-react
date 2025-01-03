import {
  getAiSummaryService,
  getIndividualOverviewService,
  getPerformanceChartDataService,
  getProjectsListService,
  getRecognitionChartDataService,
  getThirdPartyAppsDataService,
} from '../services/analytics-service';

// Projects List
export const getProjectsList = async (set: any) => {
  set({ isProjectsListLoading: true });
  const data: any = await getProjectsListService();
  set((state: any) => ({
    ...state,
    projectsList: data,
  }));
  set({ isProjectsListLoading: false });
};

// Recognition Chart
export const getRecognitionChartData = async (projectId: string, userId: string, set: any) => {
  set({ isRecognitionChartLoading: true });
  const data: any = await getRecognitionChartDataService(projectId, userId);
  set((state: any) => ({
    ...state,
    recognitionChartData: data,
  }));
  set({ isRecognitionChartLoading: false });
};

// Performance Chart
export const getPerformanceChartData = async (projectId: string, userId: string, set: any) => {
  console.log('getPerformanceChartData', projectId, userId);
  set({ isPerformanceChartLoading: true });
  const data: any = await getPerformanceChartDataService(projectId, userId);
  set((state: any) => ({
    ...state,
    performanceChartData: data,
  }));
  set({ isPerformanceChartLoading: false });
};

// AI Summary
export const getAiSummary = async (projectId: string, userId: string, set: any) => {
  set({ isAiSummaryLoading: true });
  const data: any = await getAiSummaryService(projectId, userId);
  set((state: any) => ({
    ...state,
    aiSummary: data,
  }));
  set({ isAiSummaryLoading: false });
};

// Individual Overview
export const getIndividualOverview = async (userId: string, projectId: string, set: any) => {
  set({ isIndividualOverviewLoading: true });
  const data: any = await getIndividualOverviewService(userId, projectId);
  set((state: any) => ({
    ...state,
    individualOverview: data,
  }));
  set({ isIndividualOverviewLoading: false });
};

// Third Party Apps Data
export const getThirdPartyAppsData = async (projectId: string, userId: string, set: any) => {
  set({ isThirdPartyAppsDataLoading: true });
  const data: any = await getThirdPartyAppsDataService(projectId, userId);
  set((state: any) => ({
    ...state,
    thirdPartyAppsData: data,
  }));
  set({ isThirdPartyAppsDataLoading: false });
};
