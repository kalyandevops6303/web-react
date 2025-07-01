export type PullRequestInsights = {
  id: string;
  number: number;
  prCreatedAt: string;
  prMergedAt: string;
  projectId: string;
  title: string;
  userId: string;
  llmSummary: string;
  overallScore: number;
  bugs: number;
  codeSmells: number;
  vulnerabilities: number;
  reliabilityRatingGrade: string;
  securityRatingGrade: string;
  maintainabilityRatingGrade: string;
  overallRatingGrade: string;
  state: string;
};

export type MeetingInsights = {
  id: string;
  projectId: string;
  userId: string;
  transcriptId: string;
  createdAt: string;
  summary: string;
  title: string;
};
