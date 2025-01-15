/**
 * Project management service module for handling project-related operations.
 * @module project-management-v2
 */

import axios from 'axios';
import { ProjectCreationFormData } from '@flexternships/types/project-creation-types';
import { routes } from '@flexternships/utils/api';
import { appendAuthToken } from '@flexternships/utils/local-storage';
import { handleError } from '@flexternships/utils/error-utils';
import { DurationType, ProjectDetails } from '../constraints/types/project-details-types';
import { MilestoneDraftArtifact, MilestoneDropdownItem } from '../constraints/types/project-milestones-types';
import { MilestoneArtifactStatus, MilestoneArtifactType, MilestoneStatus } from '../constraints/enums/core-enums';
import {
  parseCompetencies,
  parseMilestoneDetails,
  parseMilestoneDropdown,
  parseRecognitionStats,
  parseRecognitionTimeline,
} from '../utils/parsing-utils';
import { PaginatedData } from './user-management';
import { MilestoneDropdownOptions } from '../constraints/enums/miscellaneous-enums';
import { DEFAULT_ALL_MILESTONES_OPTION } from '../static/recognition-constants';

/**
 * Retrieves a file upload URL for a given filename.
 * @param filename - The name of the file to be uploaded.
 * @returns A Promise that resolves to the upload URL data.
 * @throws {Error} If the file upload URL retrieval fails or an unexpected error occurs.
 */
export const getFileUploadUrl = async (filename: string) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      filename: filename,
    },
    withCredentials: true,
  };
  try {
    const response = await axios?.get(routes?.projectManagementV2?.files?.getUploadUrl, config);
    return response?.data;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while retrieving the file upload URL');
  }
};

/**
 * Retrieves a file download URL for a given file key.
 * @param fileKey - The key of the file to be downloaded.
 * @returns A Promise that resolves to the download URL data.
 * @throws {Error} If the file download URL retrieval fails or an unexpected error occurs.
 */
export const getFileDownloadUrl = async (fileKey: string) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      file_key: fileKey,
    },
    withCredentials: true,
  };
  try {
    const response = await axios?.get(routes?.projectManagementV2?.files?.getDownloadUrl, config);
    return response?.data;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while retrieving the file download URL');
  }
};

/**
 * Creates a new Flextern project.
 * @param projectData - The data for the project to be created.
 * @param draftProjectId - Optional ID of an existing draft project to update
 * @returns A Promise that resolves to the created project ID or undefined.
 * @throws {Error} If the project creation fails or an unexpected error occurs.
 */
export const createFlexternProject: (
  projectData: ProjectCreationFormData,
  draftProjectId?: string,
) => Promise<string | undefined> = async (projectData, draftProjectId) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      project_id: draftProjectId,
    },
    withCredentials: true,
  };
  const formattedProjectData = {
    details: {
      name: projectData?.requirements?.projectName,
      description: projectData?.requirements?.projectDescription,
      expected_duration: {
        duration: projectData?.requirements?.estimatedDuration,
        duration_type: 'WEEK',
        hours_per_week: projectData?.requirements?.estimatedWeeklyHours,
      },
      expected_start_date: projectData?.requirements?.estimatedStartDate,
      documents: projectData?.requirements?.documents?.map((document) => ({
        file_name: document?.fileName,
        file_key: document?.fileKey,
        size: document?.size,
        created_at: document?.createdAt,
      })),
    },
    roles: projectData?.roles?.map((item) => ({
      role_id: item?.role?._id,
      proficiency: {
        skills: item?.skills?.map((skill) => skill?._id),
        tools: item?.tools?.map((tool) => tool?._id),
      },
      count: item?.count,
    })),
    // listing_details: {
    //   start_date_epoch: projectData?.listingDetails?.listingStartDate,
    //   end_date_epoch: projectData?.listingDetails?.listingEndDate,
    // },
    milestones: projectData.milestones.map((item) => ({
      milestone_id: item._id,
      name: item.title,
      description: item.description,
      estimated_duration: {
        duration: Math?.max(1, item?.duration),
        duration_type: 'WEEK',
      },
      deliverables: item?.deliverables,
      // "seq": 0,
      // "milestone_id": ""
    })),
    removed_milestone_ids: draftProjectId ? projectData.removedMilestoneIds ?? [] : [],
  };

  try {
    const response = await axios?.post(routes?.projectManagementV2?.project?.create, formattedProjectData, config);
    return response?.data?.data?.project_id || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while creating the Flextern project');
  }
};

/**
 * Creates a draft of a Flextern project.
 * @param projectData - The data for the project draft to be created.
 * @param draftProjectId - Optional ID of an existing draft project to update
 * @returns A Promise that resolves to the created draft project ID or undefined.
 * @throws {Error} If the project draft creation fails or an unexpected error occurs.
 */
export const createFlexternProjectDraft: (
  projectData: ProjectCreationFormData,
  draftProjectId?: string,
) => Promise<string | undefined> = async (projectData, draftProjectId) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    withCredentials: true,
  };
  let formattedProjectData = {
    details: {
      name: projectData?.requirements?.projectName,
      description: projectData?.requirements?.projectDescription,
      expected_duration: {
        duration: projectData?.requirements?.estimatedDuration,
        duration_type: 'WEEK',
        hours_per_week: projectData?.requirements?.estimatedWeeklyHours,
      },
      expected_start_date: projectData?.requirements?.estimatedStartDate,
      documents: projectData?.requirements?.documents?.map((document) => ({
        file_name: document?.fileName,
        file_key: document?.fileKey,
        size: document?.size,
        created_at: document?.createdAt,
      })),
    },
    roles: projectData?.roles?.map((item) => ({
      role_id: item?.role?._id || null,
      proficiency: {
        skills: item.skills?.map((skill) => skill._id) || [],
        tools: item.tools?.map((tool) => tool._id) || [],
      },
      count: item?.count,
    })),
    // listing_details: {
    //   start_date_epoch: projectData?.listingDetails?.listingStartDate,
    //   end_date_epoch: projectData?.listingDetails?.listingEndDate,
    // },
    milestones: projectData.milestones.map((item) => ({
      milestone_id: item._id,
      name: item.title,
      description: item.description,
      estimated_duration: {
        duration: Math?.max(1, item?.duration),
        duration_type: 'WEEK',
      },
      deliverables: item?.deliverables,
      // "seq": 0,
      // "milestone_id": ""
    })),
    removed_milestone_ids: projectData.removedMilestoneIds || [],
  };

  try {
    const response = await axios.post(
      `${routes.projectManagementV2.project.saveDraft}${draftProjectId ? `?project_id=${draftProjectId}` : ''}`,
      formattedProjectData,
      config,
    );
    return response.data?.project_id || undefined;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while creating the Flextern project draft');
  }
};

/**
 * Retrieves a draft Flextern project by project ID.
 * @param projectId - The ID of the draft project to retrieve.
 * @returns A Promise that resolves to the project creation form data or undefined.
 * @throws {Error} If the draft project retrieval fails or an unexpected error occurs.
 */
export const getFlexternProjectDraft: (projectId: string) => Promise<ProjectCreationFormData | undefined> = async (
  projectId,
) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      project_id: projectId,
    },
    withCredentials: true,
  };
  try {
    const response = await axios.get(routes.projectManagementV2.project.getDraft, config);
    const formattedDraftData = {
      requirements: {
        projectName: response.data.data.details.name || '',
        estimatedStartDate: response.data.data.details.expected_start_date || undefined,
        estimatedDuration: response.data.data.details.expected_duration?.duration || 0,
        estimatedWeeklyHours: response.data.data.details.expected_duration?.hours_per_week || 0,
        totalProjectHoursEach:
          (response.data.data.details.expected_duration?.duration || 0) *
          (response.data.data.details.expected_duration?.hours_per_week || 0),
        projectDescription: response.data.data.details.description || '',
        documents:
          response.data.data.details.documents?.map((document: any) => ({
            fileName: document.file_name,
            fileKey: document.file_key,
            size: document.size,
            createdAt: document.created_at,
          })) || [],
      },
      roles: response.data.data.roles.map((project_role: any) => ({
        role: {
          _id: project_role.role?._id,
          name: project_role.role?.name,
        },
        count: project_role.count,
        skills: project_role.proficiency.skills.map((skill: any) => ({
          _id: skill._id,
          name: skill.name,
        })),
        tools: project_role.proficiency.tools.map((tool: any) => ({
          _id: tool._id,
          name: tool.name,
        })),
      })),
      milestones: response.data.data.milestones?.map((milestone: any) => ({
        _id: milestone._id,
        title: milestone.name,
        duration: milestone.estimated_duration?.duration || 0,
        description: milestone.description,
        deliverables: milestone.deliverables,
      })),
      listingDetails: {
        listingStartDate: response.data?.data?.listing_details?.start_date_epoch || undefined,
        listingEndDate: response.data?.data?.listing_details?.end_date_epoch || undefined,
      },
    };
    return formattedDraftData;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while retrieving the Flextern project draft');
  }
};

/**
 * Recalls a project by project ID.
 * @param projectId - The ID of the project to recall.
 * @returns A Promise that resolves when recall is successful.
 * @throws {Error} If the project recall fails.
 */
export const recallProjectById = async (projectId: string): Promise<void> => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      project_id: projectId,
    },
    withCredentials: true,
  };

  try {
    await axios.put(routes.projectManagementV2.project.recallProjectById, null, config);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while recalling the Flextern project');
  }
};

/**
 * Retrieves project details by project ID.
 * @param projectId - The ID of the project to retrieve details for.
 * @returns A Promise that resolves to the project details or undefined.
 * @throws {Error} If the project details retrieval fails or an unexpected error occurs.
 */
export const getProjectDetailsById: (projectId: string) => Promise<ProjectDetails | undefined> = async (projectId) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      project_id: projectId,
    },
    withCredentials: true,
  };

  try {
    const response = await axios?.get(`${routes?.projectManagementV2?.project?.getProjectById}`, config);
    const data = response?.data?.data;
    const projectDetailsData: ProjectDetails = {
      id: data?._id,
      createdAt: data?.created_at,
      updatedAt: data?.updated_at,
      isDeleted: data?.is_deleted,
      postedAt: data?.posted_at,
      details: {
        name: data?.details?.name,
        description: data?.details?.description,
        expectedDuration: {
          duration: data?.details?.expected_duration?.duration,
          durationType: data?.details?.expected_duration?.duration_type as DurationType,
          hoursPerWeek: data?.details?.expected_duration?.hours_per_week,
        },
        expectedStartDate: data?.details?.expected_start_date,
        expectedEndDate: data?.details?.expected_end_date,
        documents:
          data?.details?.documents?.map((document: any) => ({
            fileName: document?.file_name,
            fileKey: document?.file_key,
            downloadUrl: document?.download_url,
            size: document?.size,
            createdAt: document?.created_at,
          })) || [],
      },
      roles:
        data?.roles?.map((role: any) => ({
          id: role?.role_id,
          name: role?.proficiency?.skills?.[0] || '',
        })) || [],
      listingDetails: {
        startDate: data?.listing_details?.start_date,
        endDate: data?.listing_details?.end_date,
        startDateEpoch: data?.listing_details?.start_date_epoch,
        endDateEpoch: data?.listing_details?.end_date_epoch,
      },
      status: data?.status,
      lastInProgressMilestone: data.last_in_progress_milestone,
      clientUserId: data?.client_user_id,
      orgSlugId: data?.org_slug_id,
      isDocumentsSent: data?.is_documents_sent,
      isDocumentsSigned: data?.is_documents_signed,
      clientInfo: {
        id: data?.client_details?._id,
        userId: data?.client_details?.user_id,
        companyIndustry: data?.client_details?.company_industry,
        companyLogo: data?.client_details?.company_logo,
        companyName: data?.client_details?.company_name,
        companyStrength: data?.client_details?.company_strength,
        companyTagline: data?.client_details?.company_tagline,
        createdAt: data?.client_details?.created_at,
        currencyPreference: data?.client_details?.currency_preference,
        educationalInstitute:
          data?.client_details?.educational_institute?.map((edu: any) => ({
            institution: edu?.institution,
          })) || [],
        firstName: data?.client_details?.first_name,
        imageUri: data?.client_details?.image_uri,
        isDeleted: data?.client_details?.is_deleted,
        lastName: data?.client_details?.last_name,
        officeAddress: {
          country: data?.client_details?.office_address?.country,
          state: data?.client_details?.office_address?.state,
          city: data?.client_details?.office_address?.city,
          streetAddress: data?.client_details?.office_address?.street_address,
          houseNumber: data?.client_details?.office_address?.house_number,
          zipCode: data?.client_details?.office_address?.zip_code,
        },
        projectAreaOfInterest: {
          skills: data?.client_details?.project_area_of_interest?.skills || [],
          tools: data?.client_details?.project_area_of_interest?.tools || [],
          area: data?.client_details?.project_area_of_interest?.area,
        },
        projectsListedCount: data?.client_details?.projects_listed_count,
        rating: data?.client_details?.rating,
        socialLinks:
          data?.client_details?.social_links?.map((link: any) => ({
            platform: link?.platform,
            url: link?.url,
          })) || [],
        title: data?.client_details?.title,
        updatedAt: data?.client_details?.updated_at,
        projectsWorkedOnCount: data?.client_details?.projects_worked_on_count,
        orgSlugId: data?.client_details?.org_slug_id,
        isOrgAdmin: data?.client_details?.is_org_admin,
        departmentName: data?.client_details?.department_name,
      },
      skillsData:
        data?.skills?.map((skill: any) => ({
          id: skill?._id,
          name: skill?.name,
        })) || [],
      toolsData:
        data?.tools?.map((tool: any) => ({
          id: tool?._id,
          name: tool?.name,
        })) || [],
      secondaryStatus: {
        id: data?.secondary_status?.id || '',
        createdAt: data?.secondary_status?.created_at || 0,
        updatedAt: data?.secondary_status?.updated_at || 0,
        isDeleted: data?.secondary_status?.is_deleted || false,
        statusLog: data?.secondary_status?.status_log || {},
        next: data?.secondary_status?.next || '',
        entity: {
          entityType: data?.secondary_status?.entity?.entity_type || '',
          entityId: data?.secondary_status?.entity?.entity_id || '',
        },
        projectId: data?.secondary_status?.project_id || '',
      },
      invitationDetails: {
        member: {
          role: {
            name: data?.invitation_details?.member?.role?.name || 'Unknown Role',
          },
        },
      },
      isDocumentsNeeded: data.is_document_needed,
      viewRecognition: data.view_recognition,
      giveRecognition: data.give_recognition,
    };

    return projectDetailsData;
  } catch (error) {
    console?.log(error);
    handleError(error as Error, 'An unexpected error occurred while creating the Flextern project draft');
  }
};

/**
 * Accepts a project by project ID.
 * @param projectId - The ID of the project to accept.
 * @returns A Promise that resolves when acceptance is successful.
 * @throws {Error} If the project acceptance fails.
 */
export const acceptProject = async (projectId: string): Promise<any> => {
  const config = {
    params: {
      project_id: projectId,
    },
    withCredentials: true,
  };

  try {
    const response = await axios.post(`${routes.projectManagementV2.project.acceptProject}`, {}, config);
    return response;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while accepting project');
  }
};

/**
 * Retrieves all milestones for a given project.
 * @param projectId - The ID of the project to retrieve milestones for.
 * @returns A Promise that resolves to the project milestones data.
 * @throws {Error} If the milestones retrieval fails or an unexpected error occurs.
 */
export const getMilestonesByProjectId = async (projectId: string) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    withCredentials: true,
  };

  try {
    const response = await axios.get(
      `${routes.projectManagementV2.milestone.getMilestonesByProjectId}?project_id=${projectId}`,
      config,
    );
    const formattedMilestones = response?.data?.data?.map((milestone: any) => parseMilestoneDetails(milestone, false));
    return formattedMilestones;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching project milestones');
  }
};

/**
 * Retrieves detailed information for a specific milestone.
 * @param milestoneId - The ID of the milestone to retrieve details for.
 * @returns A Promise that resolves to the milestone details data.
 * @throws {Error} If the milestone details retrieval fails or an unexpected error occurs.
 */
export const getMilestoneDetailsById = async (milestoneId: string) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    withCredentials: true,
  };

  try {
    const response = await axios.get(
      `${routes.projectManagementV2.milestone.getMilestoneDetailsById}?milestone_id=${milestoneId}`,
      config,
    );
    const responseData = response.data.data[0];
    const { milestoneDetails, artifactDetails } = parseMilestoneDetails(responseData, true);
    return { milestoneDetails, artifactDetails };
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching milestone details');
  }
};

/**
 * Verifies if a project name is available and valid.
 * @param projectName - The project name to verify.
 * @returns A Promise that resolves when the project name is verified.
 * @throws {Error} If the project name verification fails or an unexpected error occurs.
 */
export const verifyProjectName: (projectName: string) => Promise<void> = async (projectName) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      name: projectName,
    },
    withCredentials: true,
  };

  try {
    await axios.get(routes.projectManagementV2.project.verifyProjectName, config);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while verifying the project name');
  }
};

/**
 * Updates milestone artifacts with a given status.
 * @param targetArtifactStatus - The target status for the artifacts.
 * @param milestoneId - The ID of the milestone to update artifacts for.
 * @param submittedArtifacts - Array of artifacts to submit.
 * @param deletedArtifactIds - Array of artifact IDs to delete.
 * @returns A Promise that resolves when the artifacts are updated.
 * @throws {Error} If the artifact update fails or an unexpected error occurs.
 */
export const putArtifactsByMilestoneId = async (
  targetArtifactStatus: MilestoneArtifactStatus,
  milestoneId: string,
  submittedArtifacts: MilestoneDraftArtifact[],
  deletedArtifactIds: string[],
) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: {
      milestone_id: milestoneId,
      artifact_status: targetArtifactStatus,
    },
    withCredentials: true,
  };

  const formattedData: Record<string, any> = {
    params: submittedArtifacts.map((artifact) => {
      const formattedArtifact: Record<string, any> = {
        type: artifact.type,
        description: artifact.description,
        uploaded_at: artifact.uploadedAt,
        metadata:
          artifact.type === MilestoneArtifactType.DOCUMENTS
            ? {
                file_name: artifact.metadata?.fileName,
                file_key: artifact.metadata?.fileKey,
                size: artifact.metadata?.size,
              }
            : {
                url: artifact.metadata?.url ?? '',
              },
      };

      if (artifact.artifactId) {
        formattedArtifact.artifact_id = artifact.artifactId;
      }

      return formattedArtifact;
    }),
    delete_artifacts: deletedArtifactIds,
  };

  try {
    await axios.put(routes.projectManagementV2.milestone.putArtifactsByMilestoneId, formattedData, config);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while posting artifacts');
  }
};

/**
 * Deletes a specific milestone artifact by its ID.
 * @param milestoneArtifactId - The ID of the milestone artifact to delete.
 * @returns A Promise that resolves when the artifact is deleted.
 * @throws {Error} If the deletion fails or an unexpected error occurs.
 */
export const deleteMilestoneArtifactById = async (milestoneArtifactId: string) => {
  const headers = appendAuthToken({});
  const config = { headers: headers, params: { milestone_artifact_id: milestoneArtifactId }, withCredentials: true };

  try {
    await axios.delete(routes.projectManagementV2.milestone.deleteMilestoneArtifactById, config);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while deleting milestone artifact');
  }
};

/**
 * Updates the status of a milestone.
 * @param milestoneId - The ID of the milestone to update.
 * @param targetStatus - The target status to set for the milestone.
 * @returns A Promise that resolves when the milestone status is updated.
 * @throws {Error} If the status update fails or an unexpected error occurs.
 */
export const updateMilestoneStatus = async (milestoneId: string, targetStatus: MilestoneStatus) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    withCredentials: true,
  };
  let formattedPayload = {
    milestone_id: milestoneId,
    milestone_status: targetStatus,
  };

  try {
    await axios.post(routes.projectManagementV2.milestone.updateStatus, formattedPayload, config);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while updating milestone status');
  }
};

/**
 * Marks milestone artifacts as read.
 * @param milestoneId - The ID of the milestone whose artifacts should be marked as read.
 * @returns A Promise that resolves when the artifacts are marked as read.
 * @throws {Error} If the operation fails or an unexpected error occurs.
 */
export const markMilestoneArtifactAsRead = async (milestoneId: string) => {
  const headers = appendAuthToken({});
  const config = { headers: headers, params: { milestone_id: milestoneId }, withCredentials: true };

  try {
    await axios.post(routes.projectManagementV2.notification.markMilestoneArtifactAsRead, {}, config);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while marking milestone artifact as read');
  }
};

/**
 * Submits kudos or wow recognition for team members on a milestone.
 * @param milestoneId - The ID of the milestone to submit recognition for.
 * @param teamMemberIds - Array of team member IDs to receive the recognition.
 * @returns A Promise that resolves when the recognition is submitted.
 * @throws {Error} If the submission fails or an unexpected error occurs.
 */
export const submitKudosOrWow = async (milestoneId: string, teamMemberIds: string[]) => {
  const headers = appendAuthToken({});
  const config = { headers: headers, params: { milestone_id: milestoneId }, withCredentials: true };

  try {
    await axios.post(routes.projectManagementV2.feedback.submitKudosWow, teamMemberIds, config);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while submitting kudos or wow');
  }
};

/**
 * Terminates a project.
 * @param projectId - The ID of the project to terminate.
 * @returns A Promise that resolves when the project is terminated.
 * @throws {Error} If the termination fails or an unexpected error occurs.
 */
export const terminateProject = async (projectId: string) => {
  const headers = appendAuthToken({});
  const config = { headers: headers, params: { project_id: projectId }, withCredentials: true };

  try {
    await axios.put(routes.projectManagementV2.project.terminateProject, {}, config);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while terminating the project');
  }
};

/**
 * Withdraws a project.
 * @param projectId - The ID of the project to withdraw.
 * @returns A Promise that resolves when the project is withdrawn.
 * @throws {Error} If the withdrawal fails or an unexpected error occurs.
 */
export const withdrawProject = async (projectId: string) => {
  const headers = appendAuthToken({});
  const config = { headers: headers, params: { project_id: projectId }, withCredentials: true };

  try {
    await axios.put(routes.projectManagementV2.project.withdrawProject, {}, config);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while withdrawing the project');
  }
};

/**
 * Relists a project with new dates.
 * @param projectId - The ID of the project to relist.
 * @param startDate - The new start date timestamp.
 * @param endDate - The new end date timestamp.
 * @returns A Promise that resolves when the project is relisted.
 * @throws {Error} If the relisting fails or an unexpected error occurs.
 */
export const relistProject = async (projectId: string, startDate: number, endDate: number) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: { project_id: projectId, start_date: startDate, end_date: endDate },
    withCredentials: true,
  };

  try {
    await axios.put(routes.projectManagementV2.project.relistProject, {}, config);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while withdrawing the project');
  }
};

/**
 * Retrieves the recognition timeline for a project and talent user.
 * @param projectId - The ID of the project to get the timeline for.
 * @param talentUserId - The ID of the talent user to get the timeline for.
 * @param milestoneId - Optional milestone ID to filter timeline by.
 * @returns A Promise that resolves to the parsed recognition timeline data.
 * @throws {Error} If the timeline retrieval fails or an unexpected error occurs.
 */
export const getRecognitionTimeline = async (projectId: string, talentUserId: string, milestoneId?: string) => {
  const config = {
    params: { project_id: projectId, talent_user_id: talentUserId, milestone_id: milestoneId },
    withCredentials: true,
  };

  try {
    const response = await axios.get(routes.projectManagementV2.recognition.recognitionTimeline, config);
    return parseRecognitionTimeline(response.data.data);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching recognition timeline');
  }
};

/**
 * Submits recognition for one or more talents in a project milestone.
 * @param projectId - The ID of the project.
 * @param milestoneId - The ID of the milestone.
 * @param selectedTalents - Array of talent recognition data containing competencies, comments and talent IDs.
 * @returns A Promise that resolves to the submission response data.
 * @throws {Error} If the submission fails or an unexpected error occurs.
 */
export const submitRecognition = async (
  projectId: string,
  milestoneId: string,
  selectedTalents: { competencies: string[]; comment: string; talentId: string }[],
) => {
  const headers = appendAuthToken({});
  const config = {
    headers: headers,
    params: { project_id: projectId, milestone_id: milestoneId },
    withCredentials: true,
  };
  const payload = {
    project_id: projectId,
    milestone_id: milestoneId,
    user_competency_comments: selectedTalents.map((talent) => ({
      user_id: talent.talentId,
      competencies: talent.competencies.map((competency) => ({
        competency_id: competency,
      })),
      comment: talent.comment,
    })),
  };

  try {
    const response = await axios.post(routes.projectManagementV2.recognition.submitRecognition, payload, config);
    return response.data.data;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while submitting recognition');
  }
};

/**
 * Gets recognition count statistics for a project.
 * @param projectId - The ID of the project.
 * @param talentUserId - Optional talent user ID to filter stats by.
 * @param milestoneId - Optional milestone ID to filter stats by.
 * @returns A Promise that resolves to the parsed recognition statistics.
 * @throws {Error} If the stats retrieval fails or an unexpected error occurs.
 */
export const getRecognitionsCount = async (projectId: string, talentUserId?: string, milestoneId?: string) => {
  const config = {
    params: { project_id: projectId, talent_user_id: talentUserId, milestone_id: milestoneId },
    withCredentials: true,
  };

  try {
    const response = await axios.get(routes.projectManagementV2.recognition.getRecognitionsCount, config);
    return parseRecognitionStats(response.data.data);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching recognition count');
  }
};
/**
 * Gets a dropdown list of milestones for a project.
 * @param projectId - The ID of the project.
 * @param options - Optional array of milestone options to filter by.
 * @returns A Promise that resolves to paginated milestone dropdown data.
 * @throws {Error} If the milestones retrieval fails or an unexpected error occurs.
 */
export const getMilestonesDropdown = async (
  projectId: string,
  options: MilestoneDropdownOptions,
  parsingOptions: { useSequence?: boolean } = { useSequence: false },
): Promise<PaginatedData<MilestoneDropdownItem>> => {
  const config = { params: { project_id: projectId, options: options }, withCredentials: true };
  try {
    const response = await axios.get(routes.projectManagementV2.milestone.milestonesDropdown, config);
    const data = parseMilestoneDropdown(response.data.data, parsingOptions);

    // Add "All Milestones" option if this is the first page and the view recognition option is selected
    if (data.metadata.current_page === 1 && options === MilestoneDropdownOptions.VIEW_RECOGNITION) {
      data.data.unshift(DEFAULT_ALL_MILESTONES_OPTION);
    }

    return data;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching milestones dropdown');
  }
  return {
    metadata: {
      current_page: 1,
      page_size: 0,
      total_records: 0,
      has_next_page: false,
    },
    data: [],
  };
};

/**
 * Gets the list of available competencies.
 * @returns A Promise that resolves to the parsed competencies data.
 * @throws {Error} If the competencies retrieval fails or an unexpected error occurs.
 */
export const getCompetencies = async () => {
  const config = { withCredentials: true };
  try {
    const response = await axios.get(routes.projectManagementV2.feedback.getCompetencies, config);
    return parseCompetencies(response.data.data);
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching competencies');
  }
};
