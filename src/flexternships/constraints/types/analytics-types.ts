import { MatrixDataItem } from './chart-types';
import { MatrixConfig } from './chart-types';
import { ParsedPaginatedData } from './core-types';

export type FlexternComments = {
  metadata: {
    currentPage: number;
    pageSize: number;
    totalRecords: number;
    hasNextPage: boolean;
  };
  comments: Array<{
    comment: string;
    giverDetails: {
      imageUri: string;
      firstName: string;
      lastName: string;
      userId: string;
      appRole: string;
      userType: string;
    };
    projectInfo: {
      name: string;
      id: string;
    };
    milestoneInfo: {
      name: string;
      seq: number;
      id: string;
    };
    createdAt: number;
  }>;
};

export type DetailedPerformanceInsights = {
  chartData: MatrixDataItem[];
  chartConfig: MatrixConfig;
  score: {
    average: number;
    max: number;
  };
};

export type TeamCompetencySummary = {
  competencyName: string;
  competencyAbbreviation: string;
  summary: string;
};

export type GitHubStats = {
  commitsCount: number;
  pullRequestsCount: number;
  projectName: string;
  githubUrl?: string;
  projectStartDate?: string;
  projectEndDate?: string;
  securityRatingGrade?: string;
  maintainabilityRatingGrade?: string;
  reliabilityRatingGrade?: string;
  lastGithubSyncRun?: string;
};

export type GitHubBranchCommit = {
  id: string;
  githubUser: string;
  message: string;
  projectId: string;
  timestamp: number;
  url: string;
  userId: string;
  imageUri?: string;
  firstName: string;
  lastName: string;
  role: string;
};

export type GitHubPullRequest = {
  id: string;
  prTitle: string;
  prNumber: number;
  prCreatedAt: string;
  prMergedAt: string | null;
  prStatus: string;
  prUserId: string | null;
  commits: Array<{
    commits: Array<{
      id: string;
      sha: string;
      githubUser: string;
      message: string;
      pullRequestNumber: number;
      timestamp: string;
      url: string;
      fullDate: string;
      firstName: string;
      lastName: string;
      imageUri: string;
      talentRole: string;
    }>;
    date: string;
  }>;
  commitsCount: number;
  bugs: string;
  codeSmells: string;
  vulnerabilities: string;
  reliabilityRatingGrade: string;
  securityRatingGrade: string;
  maintainabilityRatingGrade: string;
};

export type GitHubPullRequestHistory = ParsedPaginatedData<GitHubPullRequest>;

export type GitHubBranchHistory = ParsedPaginatedData<GitHubBranchCommit>;

export type ConversationParticipationStats = {
  messagesCount: number;
  participationPercentage: number;
  countOfMessagesPerDay: number;
  averageResponseTimeInSeconds: number;
};

export type ConversationAttachmentStats = {
  totalFilesShared: number;
  documents: {
    count: number;
    percentage: number;
  };
  links: {
    count: number;
    percentage: number;
  };
};
