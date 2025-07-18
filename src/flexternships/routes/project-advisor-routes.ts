const projectAdvisorRoutes = {
  projectWizard: (projectId: string, tab: string = 'overview') => `/project-advisor/projects/${projectId}/${tab}`,
  projectMilestoneFeedback: (projectId: string, milestoneId: string) =>
    `/project-advisor/projects/${projectId}/milestones/${milestoneId}/feedback`,
};

export default projectAdvisorRoutes;
