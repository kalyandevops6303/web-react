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

export const getProjectDetailsById: (projectId: string) => Promise<ProjectDetails | undefined> = async (projectId) => {
  const headers = appendAuthToken({});
  const config = {
      headers: headers
  }

  try {
      const response = await axios.get(`${routes.projectManagementV2.project.getProjectById}/${projectId}`, config)
      const data = response.data?.data[0]?.project;
      const projectDetailsData: ProjectDetails = {
        "id": data._id,
        "createdAt": data.created_at,
        "updatedAt": data.updated_at,
        "isDeleted": data.is_deleted,
        "details": {
          "name": data.details.name,
          "description": data.details.description,
          "expectedDuration": {
            "duration": data.details.expected_duration.duration,
            "durationType": data.details.expected_duration.duration_type,
            "hoursPerWeek": data.details.expected_duration.hours_per_week
          },
          "expectedStartDate": data.details.expected_start_date,
          "documents": data.details.documents.map((document: any) => ({
            "fileName": document.file_name,
            "fileKey": document.file_key,
            "downloadUrl": document.download_url,
            "size": document.size,
            "createdAt": document.created_at
          }))
        },
        "roles": {
            "roleId": data?.roles?.role_id,
            "proficiency": {
              "skills": data?.roles?.proficiency.skills,
              "tools": data?.roles?.proficiency.tools
            },
            "count": data?.roles?.count
          },
        "listingDetails": {
          "startDate": data.listing_details.start_date,
          "endDate": data.listing_details.end_date,
          "startDateEpoch": data.listing_details.start_date_epoch,
          "endDateEpoch": data.listing_details.end_date_epoch
        },
        "status": data.status,
        "clientUserId": data.client_user_id,
        "orgSlugId": data.org_slug_id,
        "isDocumentsSent": data.is_documents_sent,
        "isDocumentsSigned": data.is_documents_signed,
        "clientInfo": data.client_info.map((info: any) => ({
            "id": info._id,
            "userId": info.user_id,
            "companyIndustry": info.company_industry,
            "companyLogo": info.company_logo,
            "companyName": info.company_name,
            "companyStrength": info.company_strength,
            "companyTagline": info.company_tagline,
            "createdAt": info.created_at,
            "currencyPreference": info.currency_preference,
            "educationalInstitute": info.educational_institute?.map((edu: any) => ({
              "institution": edu.institution
            })),
            "firstName": info.first_name,
            "imageUri": info.image_uri,
            "isDeleted": info.is_deleted,
            "lastName": info.last_name,
            "officeAddress": {
              "country": info.office_address?.country,
              "state": info.office_address?.state,
              "city": info.office_address?.city,
              "streetAddress": info.office_address?.street_address,
              "houseNumber": info.office_address?.house_number,
              "zipCode": info.office_address?.zip_code
            },
            "projectAreaOfInterest": {
              "skills": info.project_area_of_interest?.skills,
              "tools": info.project_area_of_interest?.tools,
              "area": info.project_area_of_interest?.area
            },
            "projectsListedCount": info.projects_listed_count,
            "rating": info.rating,
            "socialLinks": info.social_links?.map((link: any) => ({
              "platform": link.platform,
              "url": link.url
            })),
            "title": info.title,
            "updatedAt": info.updated_at,
            "projectsWorkedOnCount": info.projects_worked_on_count,
            "orgSlugId": info.org_slug_id,
            "isOrgAdmin": info.is_org_admin,
            "departmentName": info.department_name
          })),
        "skillsData": data.skills_data,
        "toolsData": data.tools_data
      };
      return projectDetailsData;
  } catch (error) {
      handleError(error as Error, 'An unexpected error occurred while creating the Flextern project draft');
  }
}