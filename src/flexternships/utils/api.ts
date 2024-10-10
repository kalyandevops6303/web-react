export const baseUrls = {
    projectManagementV2: `${import.meta.env.VITE_API_ENDPOINT}/projectv2/api/v1`,
    userManagement: `${import.meta.env.VITE_API_ENDPOINT}/user/api/v1`,
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
                fetchAll: `${baseUrls.userManagement}/static/skills/all`
            },
            tools: {
                fetchAll: `${baseUrls.userManagement}/static/tools/all`
            },
            roles: {
                fetchAll: `${baseUrls.userManagement}/static/talent-role`
            }
        }
    }
    
}
