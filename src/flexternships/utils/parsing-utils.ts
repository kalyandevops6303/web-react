import { ClientDelegateRole } from '../constraints/enums/profile-enums';
import {
  MilestoneArtifact,
  MilestoneDetails,
  MilestoneDraftArtifact,
  MilestoneDropdown,
} from '../constraints/types/project-milestones-types';
import {
  FlexternClientProjectDetails,
  FlexternClientPublicProfileDetails,
} from '../constraints/types/user-profile-types';
import { FlexternComments } from '../constraints/types/analytics-types';
import { RecognitionStats, RecognitionTimeline } from '../constraints/types/recognition-types';
import { TeamMemberDetails } from '../constraints/types/project-details-types';
import { Competency } from '../constraints/types/competency-types';
import { FlexternUserAppRole } from '../constraints/enums/core-enums';

/**
 * Parses milestone details from raw data into a structured format
 * @param data Raw milestone data from API
 * @param separateArtifacts Whether to separate milestone details and artifacts into separate objects
 * @returns Formatted milestone details with optional separate artifact details
 */
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

/**
 * Parses client public profile details from raw data
 * @param data Raw client profile data from API
 * @returns Formatted client public profile details
 */
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

/**
 * Parses client completed projects from raw data
 * @param data Raw project data from API
 * @returns Formatted client project details
 */
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

/**
 * Parses Flextern comments from raw data
 * @param data Raw comments data from API
 * @returns Formatted Flextern comments
 */
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

/**
 * Parses recognition timeline data from raw API response
 * @param data Raw recognition timeline data from API
 * @returns Formatted recognition timeline array
 */
export const parseRecognitionTimeline = (data: Record<string, any>): RecognitionTimeline => {
  return data.map((recognition: Record<string, any>) => {
    const giverAppRole = recognition.giver_details.app_role;
    const giverDesignation =
      giverAppRole === FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE
        ? 'Mentor'
        : giverAppRole === FlexternUserAppRole.FLEXTERN_CLIENT
        ? 'Manager'
        : recognition.giver_details.project_role;

    const giverName =
      giverAppRole === FlexternUserAppRole.FLEXTERN_CLIENT_DELEGATE
        ? `${recognition.giver_details.first_name} ${recognition.giver_details.last_name} (${recognition.giver_details.delegate_first_name} ${recognition.giver_details.delegate_last_name})`
        : `${recognition.giver_details.first_name} ${recognition.giver_details.last_name}`; // Full name for both client and talent
    return {
      giverDetails: {
        name: giverName,
        profileImage: recognition.giver_details.image_uri,
        designation: giverDesignation,
        appRole: giverAppRole,
      },
      type: recognition.giver_location,
      milestoneNumber: recognition.milestone.seq,
      timestamp: recognition.created_at,
      selectedCompetencies: recognition.competencies.map((competency: Record<string, any>) => ({
        id: competency._id,
        name: competency.name,
        abbreviation: competency.abbreviation,
        colorCode: competency.color_code,
        createdAt: competency.created_at,
        updatedAt: competency.updated_at,
      })),
      comment: recognition.comment,
    };
  });
};

/**
 * Parses team details from raw API response
 * @param data Raw team details data from API
 * @param options Options to filter team members (e.g. include only joined members)
 * @returns Array of formatted team member details
 */
export const parseTeamDetails = (
  data: Record<string, any>,
  options: { includeOnlyJoined: boolean; hideUserIds?: string[] } = { includeOnlyJoined: false, hideUserIds: [] },
): TeamMemberDetails[] => {
  let teamMembers = data.map((member: Record<string, any>) => ({
    id: member._id,
    name: member?.first_name + ' ' + member?.last_name || '',
    profileImage: member?.image_uri || '',
    designation: member?.role_name || '',
    email: member?.user_email,
    invitedOn: member?.invited_on,
    averageRating: member?.averageRating,
    appreciationScore: member?.appreciation_score,
    isDocumentsSigned: member?.is_documents_signed,
  }));

  if (options.includeOnlyJoined) {
    teamMembers = teamMembers.filter(
      (member: Record<string, any>) => member.isDocumentsSigned === options.includeOnlyJoined,
    );
  }
  if (options.hideUserIds) {
    teamMembers = teamMembers.filter((member: Record<string, any>) => !options.hideUserIds?.includes(member.id));
  }
  return teamMembers;
};

/**
 * Parses recognition statistics from raw API response
 * @param data Raw recognition stats data from API
 * @returns Formatted recognition statistics
 */
export const parseRecognitionStats = (data: Record<string, any>): RecognitionStats => {
  return {
    teamMembers: data.team_members_count,
    totalRecognitions: data.kudos_count || data.wow_count || 0,
  };
};

/**
 * Parses competencies data from raw API response
 * @param data Raw competencies data from API
 * @returns Array of formatted competencies
 */
export const parseCompetencies = (data: Record<string, any>): Competency[] => {
  return data.map((competency: Record<string, any>) => ({
    id: competency._id,
    name: competency.name,
    abbreviation: competency.abbreviation,
    colorCode: competency.color_code,
    createdAt: competency.created_at,
    updatedAt: competency.updated_at,
  }));
};

/**
 * Parses milestone dropdown data from raw API response
 * @param data Raw milestone dropdown data from API
 * @param parsingOptions Options for parsing (e.g. whether to use sequence numbers)
 * @returns Formatted milestone dropdown data
 */
export const parseMilestoneDropdown = (
  data: Record<string, any>,
  parsingOptions: { useSequence?: boolean },
): MilestoneDropdown => {
  let parsedData = parsingOptions.useSequence
    ? {
        metadata: data.metadata,
        data: data.data.map((milestone: Record<string, any>) => ({
          ...milestone,
          name: `Milestone ${milestone.seq}`,
        })),
      }
    : {
        metadata: data.metadata,
        data: data.data,
      };

  return parsedData;
};
