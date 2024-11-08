import { getMilestonesByProjectId, getMilestoneDetailsById } from '../services/project-management-v2';
import { useMilestoneArtifactsStore } from '../stores/project-milestones-store';

export const populateProjectMilestones = async (projectId: string, set: any) => {
  set({ isMilestonesLoading: true });
  const milestones = await getMilestonesByProjectId(projectId);
  const formattedMilestones = milestones.map((milestone: any) => ({
    id: milestone._id,
    projectId: milestone.project_id,
    name: milestone.name,
    startDate: milestone.start_date,
    endDate: milestone.end_date,
    description: milestone.description,
    estimatedDuration: {
      duration: milestone.estimated_duration.duration,
      durationType: milestone.estimated_duration.duration_type,
    },
    deliverables: milestone.deliverables,
    status: milestone.status,
    milestoneBy: {
      entity: milestone.milestone_by.entity,
      entityId: milestone.milestone_by.entity_id,
      orgSlugId: milestone.milestone_by.org_slug_id,
    },
    seq: milestone.seq,
    milestoneFeedbackDetails: {
      id: milestone.milestone_feedback_details?.id,
      milestoneId: milestone.milestone_feedback_details?.milestone_id,
      orgSlugId: milestone.milestone_feedback_details?.org_slug_id,
      projectId: milestone.milestone_feedback_details?.project_id,
      entityId: milestone.milestone_feedback_details?.entity_id,
      entityType: milestone.milestone_feedback_details?.entity_type,
      feedback: {
        feedbackId: milestone.milestone_feedback_details?.feedback?.feedback_id,
        feedbackType: milestone.milestone_feedback_details?.feedback?.feedback_type,
        feedbackStatus: milestone.milestone_feedback_details?.feedback?.feedback_status,
      },
    },
  }));
  set({ projectMilestones: formattedMilestones, isMilestonesLoading: false });
};

export const populateMilestoneDetails = async (milestoneId: string, set: any) => {
  const setDraftArtifacts = useMilestoneArtifactsStore.getState().setDraftArtifacts;
  const setSubmittedArtifacts = useMilestoneArtifactsStore.getState().setSubmittedArtifacts;

  const milestoneDetails = await getMilestoneDetailsById(milestoneId);

  const formattedMilestoneDetails = {
    id: milestoneDetails._id,
    projectId: milestoneDetails.project_id,
    name: milestoneDetails.name,
    startDate: milestoneDetails.start_date,
    endDate: milestoneDetails.end_date,
    description: milestoneDetails.description,
    estimatedDuration: {
      duration: milestoneDetails.estimated_duration.duration,
      durationType: milestoneDetails.estimated_duration.duration_type,
    },
    deliverables: milestoneDetails.deliverables,
    status: milestoneDetails.status,
    milestoneBy: {
      entity: milestoneDetails.milestone_by.entity,
      entityId: milestoneDetails.milestone_by.entity_id,
      orgSlugId: milestoneDetails.milestone_by.org_slug_id,
    },
    seq: milestoneDetails.seq,
    milestoneFeedbackDetails: {
      id: milestoneDetails.milestone_feedback_details?.id,
      milestoneId: milestoneDetails.milestone_feedback_details?.milestone_id,
      orgSlugId: milestoneDetails.milestone_feedback_details?.org_slug_id,
      projectId: milestoneDetails.milestone_feedback_details?.project_id,
      entityId: milestoneDetails.milestone_feedback_details?.entity_id,
      entityType: milestoneDetails.milestone_feedback_details?.entity_type,
      feedback: {
        feedbackId: milestoneDetails.milestone_feedback_details?.feedback?.feedback_id,
        feedbackType: milestoneDetails.milestone_feedback_details?.feedback?.feedback_type,
        feedbackStatus: milestoneDetails.milestone_feedback_details?.feedback?.feedback_status,
      },
    },
  };

  set({ milestoneDetails: formattedMilestoneDetails });

  setDraftArtifacts((milestoneDetails?.milestone_artifact_details_draft || []).map(((artifact: any) => ({
    artifactId: artifact.artifact_id,
    type: artifact.type,
    status: artifact.status,
    name: artifact.name,
    description: artifact.description,
    submittedBy: {
      name: artifact.submitted_by?.name,
      avatar: artifact.submitted_by?.avatar,
    },
    submittedAt: artifact.submitted_at,
    metadata: {
      // file props
      fileKey: artifact.metadata?.file_key,
      size: artifact.metadata?.size,
      // link props
      url: artifact.metadata?.url,
    },
  }))));

  setSubmittedArtifacts((milestoneDetails?.milestone_artifact_details_submitted || []).map(((artifact: any) => ({
    artifactId: artifact.artifact_id,
    type: artifact.type,
    status: artifact.status,
    name: artifact.name,
    description: artifact.description,
    submittedBy: {
      name: artifact.submitted_by?.name,
      avatar: artifact.submitted_by?.avatar,
    },
    submittedAt: artifact.submitted_at,
    metadata: {
      // file props
      fileKey: artifact.metadata?.file_key,
      size: artifact.metadata?.size,
      // link props
      url: artifact.metadata?.url,
    },
  }))));
};

export const saveDraftArtifacts = async (get: any, set: any) => {
  // TODO: Implement save draft artifacts
};

export const submitDraftArtifacts = async (get: any, set: any) => {
  // TODO: Implement submit draft artifacts
};
