import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const projectMilestonesService = (projectId) =>
  DataService.get(`${API.projectMilestones.getProjectMilestones}?project_id=${projectId}`);

const milestoneTransactionsService = (projectId) =>
  DataService.get(`${API.projectMilestones.getProjectTransactions}?project_id=${projectId}`);

const submitMilestoneService = (milestone_id, data) =>
  DataService.put(`${API.projectMilestones.submitMilestone}?milestone_id=${milestone_id}`, data);

const acceptMilestoneService = (milestone_id) =>
  DataService.put(`${API.projectMilestones.submitMilestone}?milestone_id=${milestone_id}`);

export { projectMilestonesService, milestoneTransactionsService, submitMilestoneService, acceptMilestoneService };
