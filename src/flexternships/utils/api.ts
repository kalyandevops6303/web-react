export const baseUrls = {
    projectManagementV2: `${import.meta.env.VITE_API_BASE_URL}/projectv2/api/v1`,
    userManagement: `${import.meta.env.VITE_API_BASE_URL}/user/api/v1`,
    userManagementV2: `${import.meta.env.VITE_API_BASE_URL}/user/api/v2`,
}

export const routes = {
    projectManagementV2: {
        files: {
            getUploadUrl: `${baseUrls.projectManagementV2}/project/file`,
            getDownloadUrl: `${baseUrls.projectManagementV2}/download/url`,
        },
        project: {
            create: `${baseUrls.projectManagementV2}/project`,
            saveDraft: `${baseUrls.projectManagementV2}/project/draft/save`,
        }
    },
    userManagement: {
        static: {
            skills: {
                fetchAll: `${baseUrls.userManagement}/static/skills/all`,
                fetchPaginated: `${baseUrls.userManagement}/static/skills/paginated`
            },
            tools: {
                fetchAll: `${baseUrls.userManagement}/static/tools/all`,
                fetchPaginated: `${baseUrls.userManagement}/static/tools/paginated`
            },
            roles: {
                fetchAll: `${baseUrls.userManagement}/static/talent-role`,
                fetchPaginated: `${baseUrls.userManagement}/static/talent-role/paginated`
            },
            companyIndustry: {
                fetchPaginated: `${baseUrls.userManagement}/static/company-industry/paginated`
            },
            country: {
                fetchPaginated: `${baseUrls.userManagement}/static/country/paginated`
            },
            state: {
                fetchPaginatedByCountry: `${baseUrls.userManagement}/static/state-by-id/paginated`
            },
            city: {
                fetchPaginatedByState: `${baseUrls.userManagement}/static/city/paginated`
            },
        },
        files: {
            getImageUploadUrl: `${baseUrls.userManagement}/user/profile/image-url`,
        },
        user: {
            getUserDetails: `${baseUrls.userManagement}/user/details`,
            v2: {
                postAccountDetails: `${baseUrls.userManagementV2}/client/account-details`,
                putProfileDetails: `${baseUrls.userManagementV2}/client/profile-details`,
                getOrganisationDetails: `${baseUrls.userManagementV2}/client/organisation-details`,
            }
        },
        password: {
            changePasswordWithCurrentPassword: `${baseUrls.userManagement}/user/reset-password`,
        }
    }
    
}
