import axios from 'axios';
import { ProjectCreationFormData } from '@flexternships/types/project-creation-types';
import { routes } from '@flexternships/utils/api';
import { appendAuthToken } from '@flexternships/utils/local-storage';
import { handleError } from '@flexternships/utils/error-utils';
import { ProjectDetails } from '../constraints/types/project-details-types';

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
        }
    }
    try {
        const response = await axios.get(routes.projectManagementV2.files.getUploadUrl, config);
        return response.data;
    } catch (error) {
        handleError(error as Error, 'An unexpected error occurred while retrieving the file upload URL');
    }
}

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
        }
    }
    try {
        const response = await axios.get(routes.projectManagementV2.files.getDownloadUrl, config);
        return response.data;
    } catch (error) {
        handleError(error as Error, 'An unexpected error occurred while retrieving the file download URL');
    }
}

/**
 * Creates a new Flextern project.
 * @param projectData - The data for the project to be created.
 * @returns A Promise that resolves to the created project ID or undefined.
 * @throws {Error} If the project creation fails or an unexpected error occurs.
 */
export const createFlexternProject: (projectData: ProjectCreationFormData) => Promise<string | undefined> = async (projectData) => {
    const headers = appendAuthToken({});
    const config = {
        headers: headers
    }
    const formattedProjectData = {
        "details": {
          "name": projectData.requirements.projectName,
          "description": projectData.requirements.projectDescription,
          "expected_duration": {
            "duration": projectData.requirements.estimatedDuration,
            "duration_type": "WEEK",
            "hours_per_week": projectData.requirements.estimatedWeeklyHours
          },
          "expected_start_date": projectData.requirements.estimatedStartDate,
          "documents": projectData.requirements.documents.map((document) => ({
            "file_name": document.fileName,
            "file_key": document.fileKey,
            "size": document.size,
            "created_at": document.createdAt,
          })),
        },
        "roles": projectData.roles.map((item) => (
            {
                "role_id": item.role._id,
                "proficiency": {
                  "skills": item.skills.map((skill)=>(skill._id)),
                  "tools": item.tools.map((tool) => (tool._id)),
                },
                "count": item.count,
            }
        )),
        "listing_details": {
          "start_date_epoch": projectData.listingDetails.listingStartDate,
          "end_date_epoch": projectData.listingDetails.listingEndDate,
        },
        "milestones": projectData.milestones.map((item) => ({
                "name": item.title,
                "description": item.description,
                "estimated_duration": {
                  "duration": Math.max(1, item.duration),
                  "duration_type": "WEEK"
                },
                "deliverables": item.deliverables,
                // "seq": 0,
                // "milestone_id": ""
        })),
    };

    try {
        const response = await axios.post(routes.projectManagementV2.project.create, formattedProjectData, config)
        return response.data?.project_id || undefined;
    } catch (error) {
        handleError(error as Error, 'An unexpected error occurred while creating the Flextern project');
    }
}

/**
 * Creates a draft of a Flextern project.
 * @param projectData - The data for the project draft to be created.
 * @returns A Promise that resolves to the created draft project ID or undefined.
 * @throws {Error} If the project draft creation fails or an unexpected error occurs.
 */
export const createFlexternProjectDraft: (projectData: ProjectCreationFormData) => Promise<string | undefined> = async (projectData) => {
    const headers = appendAuthToken({});
    const config = {
        headers: headers
    }
    let formattedProjectData = {
        "details": {
          "name": projectData.requirements.projectName,
          "description": projectData.requirements.projectDescription,
          "expected_duration": {
            "duration": projectData.requirements.estimatedDuration,
            "duration_type": "WEEK",
            "hours_per_week": projectData.requirements.estimatedWeeklyHours
          },
          "expected_start_date": projectData.requirements.estimatedStartDate,
          "documents": projectData.requirements.documents.map((document) => ({
            "file_name": document.fileName,
            "file_key": document.fileKey,
            "size": document.size,
            "created_at": document.createdAt,
          })),
        },
        "roles": projectData.roles.map((item) => (
            {
                "role_id": item.role._id || null,
                "proficiency": {
                  "skills": item.skills.map((skill)=>(skill._id)),
                  "tools": item.tools.map((tool) => (tool._id)),
                },
                "count": item.count,
            }
        )),
        "listing_details": {
          "start_date_epoch": projectData.listingDetails.listingStartDate,
          "end_date_epoch": projectData.listingDetails.listingEndDate,
        },
        "milestones": projectData.milestones.map((item) => ({
                "name": item.title,
                "description": item.description,
                "estimated_duration": {
                  "duration": Math.max(1, item.duration),
                  "duration_type": "WEEK"
                },
                "deliverables": item.deliverables,
                // "seq": 0,
                // "milestone_id": ""
        })),
    };

    try {
        const response = await axios.post(routes.projectManagementV2.project.saveDraft, formattedProjectData, config)
        return response.data?.project_id || undefined;
    } catch (error) {
        handleError(error as Error, 'An unexpected error occurred while creating the Flextern project draft');
    }
}

/**
 * Retrieves project details by project ID.
 * @param projectId - The ID of the project to retrieve details for.
 * @returns A Promise that resolves to the project details or undefined.
 * @throws {Error} If the project details retrieval fails or an unexpected error occurs.
 */
export const getProjectDetailsById: (projectId: string) => Promise<ProjectDetails | undefined> = async (projectId) => {
  const headers = appendAuthToken({});
  const config = {
      headers: headers
  }

  try {
      const response = await axios.get(`${routes.projectManagementV2.project.getProjectById}/${projectId}`, config)
      return response.data?.data[0] || undefined;
  } catch (error) {
      handleError(error as Error, 'An unexpected error occurred while creating the Flextern project draft');
  }
}

/**
 * Retrieves all milestones for a given project.
 * @param projectId - The ID of the project to retrieve milestones for.
 * @returns A Promise that resolves to the project milestones data.
 * @throws {Error} If the milestones retrieval fails or an unexpected error occurs.
 */
export const getMilestonesByProjectId = async (projectId: string) => {
  const headers = appendAuthToken({});
  const config = {
      headers: headers
  }

  try {
    const response = await axios.get(`${routes.projectManagementV2.milestone.getMilestonesByProjectId}?project_id=${projectId}`, config);
    return response.data.data;
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching project milestones');
  }
}

/**
 * Retrieves detailed information for a specific milestone.
 * @param milestoneId - The ID of the milestone to retrieve details for.
 * @returns A Promise that resolves to the milestone details data.
 * @throws {Error} If the milestone details retrieval fails or an unexpected error occurs.
 */
export const getMilestoneDetailsById = async (milestoneId: string) => {
  const headers = appendAuthToken({});
  const config = {
      headers: headers
  }

  try {
    const response = await axios.get(`${routes.projectManagementV2.milestone.getMilestoneDetailsById}?milestone_id=${milestoneId}`, config);
    return response.data.data[0];
  } catch (error) {
    handleError(error as Error, 'An unexpected error occurred while fetching milestone details');
  }
}