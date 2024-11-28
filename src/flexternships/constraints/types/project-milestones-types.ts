import {
  MilestoneArtifactStatus,
  MilestoneArtifactType,
  MilestoneFeedbackStatus,
  MilestoneFeedbackType,
  MilestoneStatus,
  UserType,
} from '../enums/core-enums';
import { MilestoneDetailsModalType } from '../enums/miscellaneous-enums';

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
  isRead: boolean;
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

export type MilestoneFeedback = {
  feedbackId?: string;
  feedbackType: MilestoneFeedbackType;
  feedbackStatus: MilestoneFeedbackStatus;
  numberOfQuestions: number;
  timeToComplete: number;
};

export type MilestoneDetails = {
  id: string;
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
  projectDetails: {
    projectId: string;
    hoursPerWeek: number;
  };
  deliverables: string[];
  status: MilestoneStatus;
  milestoneBy: {
    entity: UserType;
    entityId: string;
    orgSlugId: string;
  };
  seq: number;
  milestoneFeedbackDetails: MilestoneFeedback[];
  maxFeedbackDueDays: number;
  isBlocked: boolean;
  isRead?: boolean;
  lastWorkingMilestoneSeq?: number;
};

export type ProjectMilestonesState = {
  isMilestonesLoading: boolean;
  isMilestoneDetailsLoading: boolean;
  activeModal: MilestoneDetailsModalType | undefined;
  projectMilestones: MilestoneDetails[];
  milestoneDetails: MilestoneDetails;
};

export type ProjectMilestonesActions = {
  populateProjectMilestones: (projectId: string) => Promise<void>;
  populateMilestoneDetails: (milestoneId: string) => Promise<void>;
  markMilestoneAsCompleted: (milestoneId: string) => Promise<void>;
  acceptMilestone: (milestoneId: string) => Promise<void>;
  closeModal: () => void;
  openModal: (modal: MilestoneDetailsModalType) => void;
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
