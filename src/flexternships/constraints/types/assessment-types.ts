import { ProjectPrimaryStatus } from '../enums/core-enums';
import { AssessmentStatus, AssessmentType } from '../enums/assessment-enums';

export type GradeMetadata = {
  id: string;
  name: string;
  toPercentage: number;
  fromPercentage: number;
  colorCode: string;
};

export type UserAssessmentResult = {
  id: string;
  overallPercentage: number;
};

export type AssessmentSectionResult = {
  name: string;
  grade: string;
  skills: Array<{
    name: string;
    grade: string;
  }>;
};

export type Assessment = {
  id: string;
  assessmentId: string;
  name: string;
  url: string;
  projectId: string;
  projectStatus: ProjectPrimaryStatus;
  type: AssessmentType;
  numberOfQuestions: number;
  totalDuration: number;
  userAssessmentResult?: UserAssessmentResult;
  grade?: string;
  status: AssessmentStatus;
};

export type AssessmentState = {
  assessments: Assessment[];
  isAssessmentsLoading: boolean;

  gradeMetadata: GradeMetadata[];
  isGradeMetadataLoading: boolean;
};

export type AssessmentActions = {
  populateAssessments: (options?: { projectId?: string; userId?: string; force?: boolean }) => Promise<void>;
  populateGradeMetadata: (options?: { force?: boolean }) => Promise<void>;
  resetStore: () => void;
};

export type AssessmentStore = AssessmentState & AssessmentActions;
