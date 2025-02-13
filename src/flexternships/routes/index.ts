const routes = {
  home: { path: '/' },
  verifyInvitation: { path: '/verify-invitation' },
  auth: { path: '/auth' },
  dashboard: { path: '/dashboard' },
  search: { path: '/search' },
  marketplace: { path: '/marketplace' },
  notifications: { path: '/notifications' },
  chat: { path: '/chat' },
  assessments: { path: '/assessments' },
  comingSoon: { path: '/coming-soon' },
  chatInterface: { path: '/chat-interface' },

  // Project routes
  projects: { path: '/projects' },
  projectDetails: {
    path: '/project-details/:projectId',
    generate: (projectId: string) => `/project-details/${projectId}`,
  },
  projectDetailsWithStep: {
    path: '/project-details/:projectId/:projectStep',
    generate: (projectId: string, step: string) => `/project-details/${projectId}/${step}`,
  },
  createProject: { path: '/create-project' },
  editProject: {
    path: '/create-project/:projectId',
    generate: (projectId: string) => `/create-project/${projectId}`,
  },
  milestone: {
    path: '/project-details/:projectId/milestone/:milestoneId',
    generate: (projectId: string, milestoneId: string) => `/project-details/${projectId}/milestone/${milestoneId}`,
  },
  milestoneFeedback: {
    path: '/project-details/:projectId/milestone/:milestoneId/feedback/:feedbackType',
    generate: (projectId: string, milestoneId: string, feedbackType: string) =>
      `/project-details/${projectId}/milestone/${milestoneId}/feedback/${feedbackType}`,
  },
  projectDoc: {
    path: '/project-details/:projectId/doc/:docType/*',
    generate: (projectId: string, docType: string) => `/project-details/${projectId}/doc/${docType}`,
  },
  projectStepDoc: {
    path: '/project-details/:projectId/:projectStep/doc/:docType/*',
    generate: (projectId: string, projectStep: string, docType: string) =>
      `/project-details/${projectId}/${projectStep}/doc/${docType}`,
  },
  projectStepDocId: {
    path: '/project-details/:projectId/:projectStep/doc/:docType/:docId/*',
    generate: (projectId: string, projectStep: string, docType: string, docId: string) =>
      `/project-details/${projectId}/${projectStep}/doc/${docType}/${docId}`,
  },
  blockedProjects: { path: '/projects/blocked' },

  // Analytics routes
  teamAnalytics: {
    path: '/analytics/project/:projectId/team',
    generate: (projectId: string) => `/analytics/project/${projectId}/team`,
  },
  individualAnalytics: {
    path: '/analytics/project/:projectId/individual/:userId',
    generate: (projectId: string, userId: string) => `/analytics/project/${projectId}/individual/${userId}`,
  },
  conversationParticipation: {
    path: '/analytics/project/:projectId/individual/:userId/conversation-participation',
    generate: (projectId: string, userId: string) =>
      `/analytics/project/${projectId}/individual/${userId}/conversation-participation`,
  },
  commits: {
    path: '/analytics/project/:projectId/individual/:userId/commits',
    generate: (projectId: string, userId: string) => `/analytics/project/${projectId}/individual/${userId}/commits`,
  },
  comments: {
    path: '/analytics/project/:projectId/individual/:userId/comments',
    generate: (projectId: string, userId: string) => `/analytics/project/${projectId}/individual/${userId}/comments`,
  },
  teamPerformanceInsights: {
    path: '/analytics/project/:projectId/team/performance-insights',
    generate: (projectId: string) => `/analytics/project/${projectId}/team/performance-insights`,
  },

  // Profile routes
  clientProfile: {
    path: '/profile/client/:userId',
    generate: (userId: string) => `/profile/client/${userId}`,
  },
  talentProfile: {
    path: '/profile/:userType/:userId',
    generate: (userId: string) => `/profile/talent/${userId}`,
  },
  clientProfileEdit: {
    path: '/client-profile-edit/:tabId',
    generate: (tabId: string) => `/client-profile-edit/${tabId}`,
  },
  talentProfileEdit: {
    path: '/talent-profile-edit/:section-details',
    generate: (sectionDetails: string) => `/talent-profile-edit/${sectionDetails}`,
  },

  // Onboarding routes
  talentOnboarding: {
    path: '/talent-onboarding/:section',
    generate: (section: string) => `/talent-onboarding/${section}`,
  },
  clientOnboarding: { path: '/client-onboarding' },
  chooseTalentProgram: { path: '/talent-onboarding/choose-program' },

  // Quick actions
  quickActions: {
    path: '/quick-actions/:projectId',
    generate: (projectId: string) => `/quick-actions/${projectId}`,
  },

  // Not found
  notFound: { path: '*' },
};

export default routes;
