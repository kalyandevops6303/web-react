import { MatrixDataItem } from './chart-types';

import { MatrixConfig } from './chart-types';

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
