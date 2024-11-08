import { MilestoneStatus } from '../enums/core-enums';

export type MilestoneSubmission = {
  name: string;
  type: 'FILE' | 'URL';
  fileKey?: string;
  description: string;
  submittedAt: number;
  submittedBy: {
    name: string;
    avatar: string;
  };
};

export type MilestoneDetails = {
  id: string;
  projectId: string;
  name: string;
  startDate: number;
  endDate: number;
  description: string;
  estimatedDuration: {
    duration: number;
    durationType: 'WEEK'; // TODO: enum
  };
  deliverables: string[];
  status: MilestoneStatus;
  submissions: MilestoneSubmission[];
  milestoneBy: {
    entity: 'CLIENT'; // TODO: enum
    entityId: string;
    orgSlugId: string;
  };
  seq: number;
  milestoneFeedbackDetails: {
    id: string;
    milestoneId: string;
    orgSlugId: string;
    projectId: string;
    entityId: string;
    entityType: string;
    feedback: {
      feedbackId: string;
      feedbackType: 'PEER_PEER'; // TODO: enum
      feedbackStatus: 'PENDING'; // TODO: enum
    };
  };
};

export type ProjectMilestonesState = {
  isMilestonesLoading: boolean;
  projectMilestones: MilestoneDetails[];
  milestoneDetails: MilestoneDetails;
};

export type ProjectMilestonesActions = {
  populateProjectMilestones: (projectId: string) => Promise<void>;
  populateMilestoneDetails: (milestoneId: string) => Promise<void>;
};

export type ProjectMilestonesStore = ProjectMilestonesState & ProjectMilestonesActions;
