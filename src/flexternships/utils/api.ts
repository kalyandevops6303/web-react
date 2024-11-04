const baseUrl = import.meta.env.VITE_API_BASE_URL;

const serviceUrls = {
    dashboardV2: `${baseUrl}/${import.meta.env.VITE_API_ONBOARDING_PATH}/api/v2`,
    projectManagementV2: `${baseUrl}/projectv2/api/v1`,
    userManagement: `${baseUrl}/${import.meta.env.VITE_API_AUTH_PATH}/api/v1`,
    userManagementV2: `${baseUrl}/${import.meta.env.VITE_API_AUTH_PATH}/api/v2`,
}

export const routes = {
    projectManagementV2: {
        files: {
            getUploadUrl: `${serviceUrls.projectManagementV2}/project/file`,
            getDownloadUrl: `${serviceUrls.projectManagementV2}/download/url`,
        },
        project: {
            create: `${serviceUrls.projectManagementV2}/project`,
            saveDraft: `${serviceUrls.projectManagementV2}/project/draft/save`,
            getProjectById: `${serviceUrls.dashboardV2}/projects`,
        }
    },
    userManagement: {
        static: {
            skills: {
                fetchAll: `${serviceUrls.userManagement}/static/skills/all`,
                fetchPaginated: `${serviceUrls.userManagement}/static/skills/paginated`
            },
            tools: {
                fetchAll: `${serviceUrls.userManagement}/static/tools/all`,
                fetchPaginated: `${serviceUrls.userManagement}/static/tools/paginated`
            },
            roles: {
                fetchAll: `${serviceUrls.userManagement}/static/talent-role`,
                fetchPaginated: `${serviceUrls.userManagement}/static/talent-role/paginated`
            },
            companyIndustry: {
                fetchPaginated: `${serviceUrls.userManagement}/static/company-industry/paginated`
            },
            country: {
                fetchPaginated: `${serviceUrls.userManagement}/static/country/paginated`
            },
            state: {
                fetchPaginatedByCountry: `${serviceUrls.userManagement}/static/state-by-id/paginated`
            },
            city: {
                fetchPaginatedByState: `${serviceUrls.userManagement}/static/city/paginated`
            },
        },
        files: {
            getImageUploadUrl: `${serviceUrls.userManagement}/user/profile/image-url`,
        },
        user: {
            getUserDetails: `${serviceUrls.userManagement}/user/details`,
            v2: {
                postAccountDetails: `${serviceUrls.userManagementV2}/client/account-details`,
                putProfileDetails: `${serviceUrls.userManagementV2}/client/profile-details`,
                getOrganisationDetails: `${serviceUrls.userManagementV2}/client/organisation-details`,
            }
        },
        password: {
            changePasswordWithCurrentPassword: `${serviceUrls.userManagement}/user/reset-password`,
        }
    },
    projectDetails: {
        teamDetails: `${serviceUrls.projectManagementV2}/project/team-view`,
    }
    
}
