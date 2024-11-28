import {
  MilestoneArtifact,
  MilestoneDetails,
  MilestoneDraftArtifact,
} from '../constraints/types/project-milestones-types';

export const parseMilestoneDetails = (data: any, separateArtifacts: boolean = false) => {
  const formattedMilestoneDetails: MilestoneDetails = {
    id: data._id,
    name: data.name,
    startDate: data.start_date,
    endDate: data.end_date,
    submittedAt: data.milestone_submitted_at,
    acceptedAt: data.milestone_accepted_at,
    description: data.description,
    estimatedDuration: {
      duration: data.estimated_duration?.duration,
      durationType: data.estimated_duration?.duration_type,
    },
    projectDetails: {
      projectId: data.project_id,
      hoursPerWeek: data.expected_duration?.[0]?.details?.expected_duration?.hours_per_week,
    },
    deliverables: data.deliverables,
    status: data.status,
    milestoneBy: {
      entity: data.milestone_by?.entity,
      entityId: data.milestone_by?.entity_id,
      orgSlugId: data.milestone_by?.org_slug_id,
    },
    seq: data.seq,
    milestoneFeedbackDetails: (data?.milestone_feedback_details || []).map((feedback: any) => ({
      feedbackId: feedback._id,
      feedbackType: feedback.feedback_type,
      feedbackStatus: feedback.feedback_status,
      numberOfQuestions: feedback.number_of_questions ?? 8,
      timeToComplete: feedback.time_to_complete ?? 3 * 60 * 1000,
    })),
    maxFeedbackDueDays: data.max_days ?? 5,
    isBlocked: data.is_blocked,
    isRead: data.is_read,
    lastWorkingMilestoneSeq: data.last_in_progress,
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
      isRead: artifact.is_read,
    })),
  };
  return separateArtifacts
    ? { milestoneDetails: formattedMilestoneDetails, artifactDetails: formattedArtifactDetails }
    : { ...formattedMilestoneDetails, ...formattedArtifactDetails };
};
