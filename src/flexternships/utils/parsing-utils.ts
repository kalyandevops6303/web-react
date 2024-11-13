import {
  MilestoneArtifact,
  MilestoneDetails,
  MilestoneDraftArtifact,
} from '../constraints/types/project-milestones-types';

export const parseMilestoneDetails = (data: any, separateArtifacts: boolean = false) => {
  const formattedMilestoneDetails: MilestoneDetails = {
    id: data._id,
    projectId: data.project_id,
    name: data.name,
    startDate: data.start_date,
    endDate: data.end_date,
    acceptedAt: data.milestone_accepted_at,
    description: data.description,
    estimatedDuration: {
      duration: data.estimated_duration?.duration,
      durationType: data.estimated_duration?.duration_type,
    },
    deliverables: data.deliverables,
    status: data.status,
    milestoneBy: {
      entity: data.milestone_by?.entity,
      entityId: data.milestone_by?.entity_id,
      orgSlugId: data.milestone_by?.org_slug_id,
    },
    seq: data.seq,
    milestoneFeedbackDetails: {
      id: data.milestone_feedback_details?.id,
      milestoneId: data.milestone_feedback_details?.milestone_id,
      orgSlugId: data.milestone_feedback_details?.org_slug_id,
      projectId: data.milestone_feedback_details?.project_id,
      entityId: data.milestone_feedback_details?.entity_id,
      entityType: data.milestone_feedback_details?.entity_type,
      feedback: {
        feedbackId: data.milestone_feedback_details?.feedback?.feedback_id,
        feedbackType: data.milestone_feedback_details?.feedback?.feedback_type,
        feedbackStatus: data.milestone_feedback_details?.feedback?.feedback_status,
      },
    },
  };
  const formattedArtifactDetails: {
    milestoneArtifactDetailsDraft: MilestoneDraftArtifact[];
    milestoneArtifactDetailsSubmitted: MilestoneArtifact[];
  } = {
    milestoneArtifactDetailsDraft: (data?.milestone_artifact_details_draft || []).map((artifact: any) => ({
      artifactId: artifact._id,
      type: artifact.type,
      status: artifact.status,
      description: artifact.description,
      uploadedAt: artifact.uploaded_at,
      metadata: {
        // file props
        fileName: artifact.metadata?.file_name,
        fileKey: artifact.metadata?.file_key,
        size: artifact.metadata?.size,
        // link props
        url: artifact.metadata?.url,
      },
    })),
    milestoneArtifactDetailsSubmitted: (data?.milestone_artifact_details_submitted || []).map((artifact: any) => ({
      artifactId: artifact._id,
      type: artifact.type,
      status: artifact.status,
      description: artifact.description,
      updatedAt: artifact.updated_at,
      userDetails: {
        name: artifact.user_details?.first_name + ' ' + artifact.user_details?.last_name,
        imageUri: artifact.user_details?.image_uri,
      },
      metadata: {
        // file props
        fileName: artifact.metadata?.file_name,
        fileKey: artifact.metadata?.file_key,
        size: artifact.metadata?.size,
        // link props
        url: artifact.metadata?.url,
      },
    })),
  };
  return separateArtifacts
    ? { milestoneDetails: formattedMilestoneDetails, artifactDetails: formattedArtifactDetails }
    : { ...formattedMilestoneDetails, ...formattedArtifactDetails };
};
