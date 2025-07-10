// import { TimePeriodOptions } from '../constraints/enums/analytics-enums';
import {
  getAiSummaryService,
  getConversationAttachmentStatsService,
  getConversationParticipationStatsService,
  getGitHubStatsService,
  getIndividualOverviewService,
  getPerformanceChartDataService,
  getRecognitionChartDataService,
  getTeamDiversityService,
  getTeamLeaderboardService,
  getTeamMembersAttractivenessDetailsService,
  getTeamMembersDetailsService,
  getTeamPerformanceInsightsOverviewService,
  getTeamPerformanceSummaryService,
  getTeamRolesService,
  getTeamUniversitiesService,
} from '../services/analytics-service';

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

// Team Performance Summary
export const getTeamPerformanceSummary = async (projectId: string, set: any) => {
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      isPerformanceSummaryLoading: true,
    },
  }));
  const data: any = await getTeamPerformanceSummaryService(projectId);
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      performanceSummary: data,
    },
  }));
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      isPerformanceSummaryLoading: false,
    },
  }));
};

// Team Leaderboard
export const getTeamMembersAttractivenessDetails = async (projectId: string, set: any) => {
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      isTeamMembersAttractivenessDetailsLoading: true,
    },
  }));
  const data: any = await getTeamMembersAttractivenessDetailsService(projectId);
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      teamMembersAttractivenessDetails: data,
    },
  }));
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      isTeamMembersAttractivenessDetailsLoading: false,
    },
  }));
};

// Team Leaderboard
export const getTeamLeaderboard = async (projectId: string, set: any) => {
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      isTeamLeaderboardLoading: true,
    },
  }));
  const data: any = await getTeamLeaderboardService(projectId);
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      teamLeaderboard: data,
    },
  }));
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      isTeamLeaderboardLoading: false,
    },
  }));
};

// Team Roles
export const getTeamRoles = async (projectId: string, set: any) => {
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      isTeamRolesLoading: true,
    },
  }));
  const data: any = await getTeamRolesService(projectId);
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      teamRoles: data,
    },
  }));
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      isTeamRolesLoading: false,
    },
  }));
};

// Team Universities
export const getTeamUniversities = async (projectId: string, set: any) => {
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      isTeamUniversitiesLoading: true,
    },
  }));
  const data: any = await getTeamUniversitiesService(projectId);
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      teamUniversities: data,
    },
  }));
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      isTeamUniversitiesLoading: false,
    },
  }));
};

// Team Diversity
export const getTeamDiversity = async (projectId: string, set: any) => {
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      isTeamDiversityLoading: true,
    },
  }));
  const data: any = await getTeamDiversityService(projectId);
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      teamDiversity: data,
    },
  }));
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      isTeamDiversityLoading: false,
    },
  }));
};

// Team Members Details
export const getTeamMembersDetails = async (projectId: string, set: any) => {
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      isTeamMembersDetailsLoading: true,
    },
  }));
  const data: any = await getTeamMembersDetailsService(projectId);
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      teamMembersDetails: data,
    },
  }));
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      isTeamMembersDetailsLoading: false,
    },
  }));
};

// Team Performance Insights Overview
export const getTeamPerformanceInsightsOverview = async (projectId: string, set: any) => {
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      isTeamPerformanceInsightsOverviewLoading: true,
    },
  }));
  const data: any = await getTeamPerformanceInsightsOverviewService(projectId);
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      teamPerformanceInsightsOverview: data,
    },
  }));
  set((state: any) => ({
    ...state,
    team: {
      ...state.team,
      isTeamPerformanceInsightsOverviewLoading: false,
    },
  }));
};

// Conversation Participation Stats
export const getConversationParticipationStats = async (projectId: string, userId: string, set: any) => {
  set({ isConversationParticipationStatsLoading: true });
  const data: any = await getConversationParticipationStatsService(projectId, userId);
  set((state: any) => ({
    ...state,
    conversationParticipationStats: data,
  }));
  set({ isConversationParticipationStatsLoading: false });
};

// Conversation Attachment Stats
export const getConversationAttachmentStats = async (projectId: string, userId: string, set: any) => {
  set({ isConversationAttachmentStatsLoading: true });
  const data: any = await getConversationAttachmentStatsService(projectId, userId);
  set((state: any) => ({
    ...state,
    conversationAttachmentStats: data,
  }));
  set({ isConversationAttachmentStatsLoading: false });
};

// Commits
export const getCommits = async (projectId: string, userId: string, set: any) => {
  set({ isCommitsLoading: true });
  const data: any = await getGitHubStatsService(projectId, userId);
  set((state: any) => ({
    ...state,
    commits: data,
  }));
  set({ isCommitsLoading: false });
};
