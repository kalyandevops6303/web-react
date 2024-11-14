const baseUrl = import.meta.env.VITE_API_BASE_URL;

const serviceUrls = {
  dashboardV2: `${baseUrl}/${import.meta.env.VITE_API_ONBOARDING_PATH}/api/v2`,
  // projectManagementV2: `${baseUrl}/projectv2/api/v1`,
  projectManagementV2: `http://localhost:8000/projectv2/api/v1`,
  userManagement: `${baseUrl}/${import.meta.env.VITE_API_AUTH_PATH}/api/v1`,
  userManagementV2: `${baseUrl}/${import.meta.env.VITE_API_AUTH_PATH}/api/v2`,
};

export const routes = {
  projectManagementV2: {
    files: {
      getUploadUrl: `${serviceUrls.projectManagementV2}/project/file`,
      getDownloadUrl: `${serviceUrls.projectManagementV2}/download/url`,
    },
    project: {
      create: `${serviceUrls.projectManagementV2}/project`,
      saveDraft: `${serviceUrls.projectManagementV2}/project/draft/save`,
      getDraft: `${serviceUrls.projectManagementV2}/project/draft/get`,
      getProjectDetailsById: `${serviceUrls.projectManagementV2}/project/detail`,
      getProjectTeamDetails: `${serviceUrls.projectManagementV2}/project/team-view`,
      verifyProjectName: `${serviceUrls.projectManagementV2}/project/verify-name`,
      getProjectById: `${serviceUrls.projectManagementV2}/project/detail`,
      getProjectInvitationDetails: `${serviceUrls.projectManagementV2}/project/invitation-details`,
      getSelfOrTeamPerformanceDetails: `${serviceUrls.projectManagementV2}/feedback/team/overview`,
      getPeerOrIndividualPerformanceDetails: `${serviceUrls.projectManagementV2}/feedback/team/individual/overview`,
    },
    legal: {
      details: `${serviceUrls.projectManagementV2}/legal/document`,
      signDocument: `${serviceUrls.projectManagementV2}/legal/document/sign`,
    },
    milestone: {
      getMilestonesByProjectId: `${serviceUrls.projectManagementV2}/milestones`,
      getMilestoneDetailsById: `${serviceUrls.projectManagementV2}/single/milestone`,
      putArtifactsByMilestoneId: `${serviceUrls.projectManagementV2}/milestones/submission`,
      updateStatus: `${serviceUrls.projectManagementV2}/update-status/milestones`,
    },
  },
  userManagement: {
    static: {
      skills: {
        fetchAll: `${serviceUrls.userManagement}/static/skills/all`,
        fetchPaginated: `${serviceUrls.userManagement}/static/skills/paginated`,
      },
      tools: {
        fetchAll: `${serviceUrls.userManagement}/static/tools/all`,
        fetchPaginated: `${serviceUrls.userManagement}/static/tools/paginated`,
      },
      roles: {
        fetchAll: `${serviceUrls.userManagement}/static/talent-role`,
        fetchPaginated: `${serviceUrls.userManagement}/static/talent-role/paginated`,
      },
      companyIndustry: {
        fetchPaginated: `${serviceUrls.userManagement}/static/company-industry/paginated`,
      },
      country: {
        fetchPaginated: `${serviceUrls.userManagement}/static/country/paginated`,
      },
      state: {
        fetchPaginatedByCountry: `${serviceUrls.userManagement}/static/state-by-id/paginated`,
      },
      city: {
        fetchPaginatedByState: `${serviceUrls.userManagement}/static/city/paginated`,
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
      },
    },
    password: {
      changePasswordWithCurrentPassword: `${serviceUrls.userManagement}/user/reset-password`,
    },
  },
};
