import axios from 'axios';
import { ProjectCreationFormData } from '@flexternships/types/project-creation-types';
import { routes } from '@flexternships/utils/api';
import { appendAuthToken } from '@flexternships/utils/local-storage';

/**
 * Retrieves a file upload URL for a given filename.
 * @param filename - The name of the file to be uploaded.
 * @returns A Promise that resolves to the upload URL data.
 */
export const getFileUploadUrl = async (filename: string) => {
    const headers = appendAuthToken({});
    const config = {
        headers: headers,
        params: {
            filename: filename,
        }
    }
    const response = await axios.get(routes.projectManagementV2.files.getUploadUrl, config);
    return response.data;
}

/**
 * Retrieves a file download URL for a given file key.
 * @param fileKey - The key of the file to be downloaded.
 * @returns A Promise that resolves to the download URL data.
 */
export const getFileDownloadUrl = async (fileKey: string) => {
    const headers = appendAuthToken({});
    const config = {
        headers: headers,
        params: {
            file_key: fileKey,
        }
    }
    const response = await axios.get(routes.projectManagementV2.files.getDownloadUrl, config);
    return response.data;
}

/**
 * Creates a new Flextern project.
 * @param projectData - The data for the project to be created.
 * @returns A Promise that resolves to the created project ID or undefined.
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

    const response = await axios.post(routes.projectManagementV2.project.create, formattedProjectData, config)

    return response.data?.project_id || undefined;
}

/**
 * Creates a draft of a Flextern project.
 * @param projectData - The data for the project draft to be created.
 * @returns A Promise that resolves to the created draft project ID or undefined.
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

    const response = await axios.post(routes.projectManagementV2.project.saveDraft, formattedProjectData, config)

    return response.data?.project_id || undefined;
}