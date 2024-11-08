import { MilestoneStatus } from '../enums/core-enums';
export type MilestoneArtifact = {
  artifactId: string;
  type: 'DOCUMENTS' | 'LINKS';
  status: 'DRAFT' | 'SUBMITTED';
  name: string;
  description: string;
  submittedBy: {
    name: string;
    avatar: string;
  };
  submittedAt: number;
  metadata: {
    // file props
    fileKey?: string;
    size?: number;
    // link props
    url?: string;
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

export type MilestoneArtifactsState = {
  draftArtifacts: MilestoneArtifact[];
  submittedArtifacts: MilestoneArtifact[];
};
export type MilestoneArtifactsActions = {
  saveDraftArtifacts: () => Promise<void>;
  submitDraftArtifacts: () => Promise<void>;
  setDraftArtifacts: (artifacts: MilestoneArtifact[]) => void;
  setSubmittedArtifacts: (artifacts: MilestoneArtifact[]) => void;
  resetDraftArtifacts: () => void;
};

export type MilestoneArtifactsStore = MilestoneArtifactsState & MilestoneArtifactsActions;
