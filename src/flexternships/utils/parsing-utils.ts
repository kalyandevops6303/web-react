import { ClientDelegateRole } from '../constraints/enums/profile-enums';
import {
  MilestoneArtifact,
  MilestoneDetails,
  MilestoneDraftArtifact,
} from '../constraints/types/project-milestones-types';
import {
  FlexternClientProjectDetails,
  FlexternClientPublicProfileDetails,
} from '../constraints/types/user-profile-types';
import { FlexternComments } from '../constraints/types/project-details-types';

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
export const parseClientPublicDetails = (data: Record<string, any>): FlexternClientPublicProfileDetails => {
  return {
    userId: data.user_id,
    firstname: data.first_name,
    lastname: data.last_name,
    imageUri: data.image_uri,
    title: data.title,
    department: data.department,
    completedProjectsCount: data.completed_projects_count,
    openListingsCount: data.open_listing_count,
    companyDetails: {
      companyLogo: data.organization.company_logo,
      companyName: data.organization.company_name,
      companyTagline: data.organization.company_tagline,
    },
    officeAddress: {
      country: data.organization.office_address?.[0]?.country?.name,
      state: data.organization.office_address?.[0]?.state?.name,
      city: data.organization.office_address?.[0]?.city?.name,
      streetAddress: data.organization.office_address?.[0]?.street_address,
      buildingNumber: data.organization.office_address?.[0]?.building_number,
      zipCode: data.organization.office_address?.[0]?.zip_code,
    },
    socialLinks: (data.social_links || []).filter((link: { url: string }) => link.url && link.url.trim() !== ''),
    delegates: data?.client_delegate?.map((delegate: Record<string, string | undefined>) => ({
      firstname: delegate.first_name,
      lastname: delegate.last_name,
      imageUri: delegate.image_uri,
      delegateType: delegate.delegate_type || ClientDelegateRole.FULL_ACCESS,
    })),
  };
};

export const parseClientCompletedProjects = (data: Record<string, any>): FlexternClientProjectDetails => {
  return {
    metadata: {
      currentPage: data.metadata?.current_page,
      pageSize: data.metadata?.page_size,
      totalRecords: data.metadata?.total_records,
      hasNextPage: data.metadata?.has_next_page,
    },
    projects:
      data.data?.map((project: Record<string, any>) => ({
        id: project._id,
        requirements: {
          projectName: project.details?.name,
          projectDescription: project.details?.description,
          estimatedStartDate: project.details?.expected_start_date,
          estimatedDuration: project.details?.expected_duration?.duration,
          estimatedWeeklyHours: project.details?.expected_duration?.hours_per_week,
          totalProjectHoursEach:
            (project.details?.expected_duration?.duration || 0) *
            (project.details?.expected_duration?.hours_per_week || 0),
          documents: project.details?.documents?.map((document: Record<string, string | number>) => ({
            fileName: document.file_name,
            fileKey: document.file_key,
            size: document.size,
            createdAt: document.created_at,
          })),
        },
        roles:
          project.roles?.map((projectRole: Record<string, any>) => ({
            role: projectRole.role,
            count: projectRole.count,
            skills: projectRole.proficiency?.skills,
            tools: projectRole.proficiency?.tools,
          })) || [],
        milestones:
          project.milestones?.map((milestone: Record<string, any>) => ({
            title: milestone.name,
            duration: milestone.estimated_duration?.duration,
            description: milestone.description,
            deliverables: milestone.deliverables,
          })) || [],
        isTeamMember: project.is_team_member,
        isStakeholder: project.is_stakeholder,
      })) || [],
  };
};

export const parseFlexternComments = (data: Record<string, any>): FlexternComments => {
  return {
    metadata: {
      currentPage: data.metadata?.current_page,
      pageSize: data.metadata?.page_size,
      totalRecords: data.metadata?.total_records,
      hasNextPage: data.metadata?.has_next_page,
    },
    comments:
      data.data?.map((comment: Record<string, any>) => ({
        id: comment._id,
        comment: comment.comment,
        createdAt: comment.created_at,
        updatedAt: comment.updated_at,
        milestoneInfo: {
          name: comment.milestone_info.name,
          seq: comment.milestone_info.seq,
          id: comment.milestone_info._id,
        },
        projectInfo: {
          name: comment.project_info.name,
          id: comment.project_info._id,
        },
        giverDetails: {
          imageUri: comment.giver_details.image_uri,
          firstName: comment.giver_details.first_name,
          lastName: comment.giver_details.last_name,
          userId: comment.giver_details.user_id,
          appRole: comment.giver_details.app_role,
          userType: comment.giver_details.user_type,
        },
        competencyInfo: comment.competency_info,
      })) || [],
  };
};
