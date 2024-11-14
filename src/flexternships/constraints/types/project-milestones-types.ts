import { MilestoneArtifactStatus, MilestoneArtifactType, MilestoneStatus } from '../enums/core-enums';

export type MilestoneArtifact = {
  artifactId: string;
  type: MilestoneArtifactType;
  status: MilestoneArtifactStatus;
  description: string;
  updatedAt: number;
  userDetails: {
    name: string;
    imageUri: string;
  };
  metadata: {
    // file props
    fileName?: string;
    fileKey?: string;
    size?: number;
    // link props
    url?: string;
    createdAt?: number;
  };
};

export type MilestoneDraftArtifact = {
  artifactId?: string;
  type: MilestoneArtifactType;
  status: MilestoneArtifactStatus;
  description?: string;
  uploadedAt: number;
  metadata: {
    // file props
    fileName?: string;
    fileKey?: string;
    size?: number;
    // link props
    url?: string;
    uploadInfo?: {
      uploadProgress?: number;
      loading?: boolean;
      file?: File;
    };
  };
};

export type MilestoneDetails = {
  id: string;
  projectId: string;
  name: string;
  startDate: number;
  endDate: number;
  submittedAt?: number;
  acceptedAt?: number;
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
  isMilestoneDetailsLoading: boolean;
  projectMilestones: MilestoneDetails[];
  milestoneDetails: MilestoneDetails;
};

export type ProjectMilestonesActions = {
  populateProjectMilestones: (projectId: string) => Promise<void>;
  populateMilestoneDetails: (milestoneId: string) => Promise<void>;
  markMilestoneAsCompleted: (milestoneId: string) => Promise<void>;
  acceptMilestone: (milestoneId: string) => Promise<void>;
};

export type ProjectMilestonesStore = ProjectMilestonesState & ProjectMilestonesActions;

export type MilestoneArtifactsState = {
  draftArtifacts: MilestoneDraftArtifact[];
  submittedArtifacts: MilestoneArtifact[];
  removedArtifactIds: string[];
};
export type MilestoneArtifactsActions = {
  saveDraftArtifacts: (milestoneId: string) => Promise<void>;
  submitDraftArtifacts: (milestoneId: string) => Promise<void>;
  updateDraftArtifacts: (artifacts: MilestoneDraftArtifact[]) => void;
  updateSubmittedArtifacts: (artifacts: MilestoneArtifact[]) => void;
  appendToRemovedArtifactIds: (artifactId: string) => void;
  resetDraftArtifacts: () => void;
};

export type MilestoneArtifactsStore = MilestoneArtifactsState & MilestoneArtifactsActions;
