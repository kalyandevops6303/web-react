const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const serviceUrls = {
  dashboard: `${baseUrl}/${import.meta.env.VITE_API_ONBOARDING_PATH}/api/v1`,
  dashboardV2: `${baseUrl}/${import.meta.env.VITE_API_ONBOARDING_PATH}/api/v2`,
  projectManagementV2: `${baseUrl}/projectv2/api/v1`,
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
      checkDraft: `${serviceUrls.projectManagementV2}/project/draft/check`,
      getProjectDetailsById: `${serviceUrls.projectManagementV2}/project/detail`,
      getProjectTeamDetails: `${serviceUrls.projectManagementV2}/project/team-view`,
      acceptProject: `${serviceUrls.projectManagementV2}/project/accept`,
      verifyProjectName: `${serviceUrls.projectManagementV2}/project/verify-name`,
      getProjectById: `${serviceUrls.projectManagementV2}/project/detail`,
      getProjectInvitationDetails: `${serviceUrls.projectManagementV2}/project/invitation-details`,
      getSelfOrTeamPerformanceDetails: `${serviceUrls.projectManagementV2}/feedback/team/overview`,
      getPeerOrIndividualPerformanceDetails: `${serviceUrls.projectManagementV2}/feedback/team/individual/overview`,
      recallProjectById: `${serviceUrls.projectManagementV2}/project/recall`,
      terminateProject: `${serviceUrls.projectManagementV2}/project/terminate`,
      withdrawProject: `${serviceUrls.projectManagementV2}/project/withdraw`,
      relistProject: `${serviceUrls.projectManagementV2}/project/relist-date`,
    },
    legal: {
      details: `${serviceUrls.projectManagementV2}/legal/document`,
      signDocument: `${serviceUrls.projectManagementV2}/legal/document/sign`,
      checkDocumentSigned: `${serviceUrls.projectManagementV2}/legal/document/check`,
    },
    milestone: {
      getMilestonesByProjectId: `${serviceUrls.projectManagementV2}/milestones`,
      getMilestoneDetailsById: `${serviceUrls.projectManagementV2}/single/milestone`,
      putArtifactsByMilestoneId: `${serviceUrls.projectManagementV2}/milestones/submission`,
      updateStatus: `${serviceUrls.projectManagementV2}/update-status/milestones`,
      deleteMilestoneArtifactById: `${serviceUrls.projectManagementV2}/milestones/artifacts`,
      milestonesDropdown: `${serviceUrls.projectManagementV2}/milestones/dropdown`,
    },
    feedback: {
      submitKudosWow: `${serviceUrls.projectManagementV2}/feedback/kudos_wow`,
      milestoneFeedbackInfo: `${serviceUrls.projectManagementV2}/feedback`,
      submitFeedback: `${serviceUrls.projectManagementV2}/feedback/response`,
      feedbackResponse: `${serviceUrls.projectManagementV2}/feedback/response`,
      getCompetencies: `${serviceUrls.projectManagementV2}/feedback/competency`,
    },
    internalAdmin: {
      getFeedbackSkeletons: `${serviceUrls.projectManagementV2}/internal-admin/feedback/feedback-data`,
      getFeedbackStatus: `${serviceUrls.projectManagementV2}/internal-admin/feedback/status`,
      submitMilestoneFeedback: `${serviceUrls.projectManagementV2}/internal-admin/feedback/create`,
      getFeedbackDraft: `${serviceUrls.projectManagementV2}/internal-admin/feedback/get-draft`,
      submitFeedbackDraft: `${serviceUrls.projectManagementV2}/internal-admin/feedback/save-draft`,
    },
    notification: {
      markMilestoneArtifactAsRead: `${serviceUrls.projectManagementV2}/milestone/artifact/mark-as-read`,
    },
    quickActions: {
      getCount: `${serviceUrls.projectManagementV2}/quick-action/count`,
      recognitionTimeline: `${serviceUrls.projectManagementV2}/quick-action/timeline`,
      submitRecognition: `${serviceUrls.projectManagementV2}/recognition`,
    },
    notes: {
      getNoteCategories: `${serviceUrls.projectManagementV2}/note/category`,
      getPaginatedNoteCategories: `${serviceUrls.projectManagementV2}/note/category/paginated`,
      submitNotes: `${serviceUrls.projectManagementV2}/note`,
    },
    assessments: {
      fetchAll: `${serviceUrls.projectManagementV2}/assessments`,
      fetchResult: `${serviceUrls.projectManagementV2}/assessments/result`,
      fetchGradeMetadata: `${serviceUrls.projectManagementV2}/grade-metadata`,
    },
  },
  userManagement: {
    storage: {
      getBlobSasTokenParams: `${serviceUrls.userManagement}/storage/sas-token`,
    },
    auth: {
      logout: `${serviceUrls.userManagement}/user/logout`,
    },
    support: {
      contactSupport: `${serviceUrls.userManagement}/support-request`,
    },
    static: {
      timezone: {
        fetchPaginated: `${serviceUrls.userManagement}/static/timezone/paginated`,
      },
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
    notifications: {
      getNotificationsStats: `${serviceUrls.userManagement}/notifications/polling`,
    },
    invitation: {
      inviteDelegate: `${serviceUrls.userManagement}/invitation/delegate`,
      getDelegatesPaginated: `${serviceUrls.userManagement}/invitation/delegate/status`,
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
        getSupportTypes: `${serviceUrls.userManagementV2}/support-issue-types`,
        postSupportRequest: `${serviceUrls.userManagementV2}/support-request`,
      },
    },
    password: {
      changePasswordWithCurrentPassword: `${serviceUrls.userManagement}/user/reset-password`,
    },
    requests: {
      v2: {
        validateRequestToken: `${serviceUrls.userManagementV2}/requests/validation`,
        checkUser: `${serviceUrls.userManagementV2}/requests/user/check`,
      },
    },
    features: {
      getPermittedFeatures: `${serviceUrls.userManagement}/features/permitted-features`,
    },
    tnc: {
      signDocument: `${serviceUrls.userManagement}/document/sign`,
      docInfo: `${serviceUrls.userManagement}/document/info`,
      getDocumentsForSignup: `${serviceUrls.userManagement}/signup/documents`,
      getDocuments: `${serviceUrls.userManagement}/documents`,
      acceptDocumentsForSignup: `${serviceUrls.userManagement}/accept`,
      acceptDocuments: `${serviceUrls.userManagement}/user/accept`,
    },
  },
  dashboardV2: {
    clientDetails: {
      getClientPublicDetails: `${serviceUrls.dashboardV2}/client/details`,
      getClientCompletedProjects: `${serviceUrls.dashboardV2}/users/completed-projects`,
    },
    flexternComment: {
      getFlexternComments: `${serviceUrls.dashboardV2}/comment`,
      getFlexternCommentCount: `${serviceUrls.dashboardV2}/comment/count`,
    },
    flexternRoles: {
      getPaginatedFlexternRoles: `${serviceUrls.dashboardV2}/flextern/roles`,
    },
    projects: {
      getProjects: `${serviceUrls.dashboardV2}/projects`,
      markProjectAsRead: `${serviceUrls.dashboard}/alert/mark-as-read`,
    },
  },
  analytics: {
    individualOverview: `${serviceUrls.dashboardV2}/talent/header`,
    individualPerformanceSummary: `${serviceUrls.dashboardV2}/individual/analytics/performance-summary`,
    individualCommentsSummary: `${serviceUrls.dashboardV2}/individual/analytics/comments-summary`,
    recognitionChart: `${serviceUrls.dashboardV2}/analytics/tas-score`,
    performanceChart: `${serviceUrls.dashboardV2}/analytics/performance-rating`,
    projectsList: `${serviceUrls.dashboardV2}/analytics/individual/projects-list`,
    thirdPartyAppsData: `${serviceUrls.dashboardV2}/analytics/third-party-apps-data`,
    detailedPerformanceInsights: `${serviceUrls.dashboardV2}/team/performance/insights/detail`,
    teamCompetencySummary: `${serviceUrls.dashboardV2}/team/competency/summary`,
    github: {
      analytics: `${serviceUrls.dashboardV2}/individual/github/analytics`,
      stats: `${serviceUrls.dashboardV2}/individual/github/stats`,
      prHistory: `${serviceUrls.dashboardV2}/github/analytics/list`,
    },
    team: {
      performanceSummary: `${serviceUrls.dashboardV2}/team/performance/summary`,
      teamMembersAttractivenessDetails: `${serviceUrls.dashboardV2}/team/performance/leaderboard`,
      teamLeaderboard: `${serviceUrls.dashboardV2}/team/overall/leaderboard`,
      roles: `${serviceUrls.dashboardV2}/team/analytics/roles`,
      universities: `${serviceUrls.dashboardV2}/team/analytics/institutes`,
      diversity: `${serviceUrls.dashboardV2}/team/analytics/diversity`,
      teamMembersDetails: `${serviceUrls.dashboardV2}/team/analytics/leaderboard`,
      performanceInsightsOverview: `${serviceUrls.dashboardV2}/team/performance/insights`,
    },
    conversationParticipation: {
      stats: `${serviceUrls.dashboardV2}/conversation/chat/stats`,
      attachmentStats: `${serviceUrls.dashboardV2}/conversation/chat-attachment/stats`,
    },
  },
};

export const wsEndpoints = {
  bulkGeneration: `ws${baseUrl.startsWith('https') ? 's' : ''}://${baseUrl.replace(
    /^https?:\/\//,
    '',
  )}/ai-assist/api/v1/ws-bulk-generation`,
};
