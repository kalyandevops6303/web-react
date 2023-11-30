import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const projectMilestonesService = (projectId) =>
  DataService.get(`${API.projectMilestones.getProjectMilestones}?project_id=${projectId}`);

const milestoneTransactionsServiceForTeam = (projectId, milestoneId) => {
  let QUERY = `${API.projectMilestones.getProjectTransactionsForTalent}?project_id=${projectId}`;

  if (milestoneId?.length > 0) {
    QUERY += `&milestone_id=${milestoneId}`;
  }
  return DataService.get(QUERY);
};
const milestoneTransactionsServiceForClient = (projectId, milestoneId) => {
  let QUERY = `${API.projectMilestones.getProjectTransactionsForClient}?project_id=${projectId}`;

  if (milestoneId?.length > 0) {
    QUERY += `&milestone_id=${milestoneId}`;
  }
  return DataService.get(QUERY);
};

const submitMilestoneService = (milestone_id, data) =>
  DataService.put(`${API.projectMilestones.submitMilestone}?milestone_id=${milestone_id}`, data);

const acceptMilestoneService = (milestone_id) =>
  DataService.put(`${API.projectMilestones.acceptMilestone}?milestone_id=${milestone_id}`);

const milestoneFileUploadService = (filename) =>
  DataService.get(`${API.projectMilestones.projectFileUpload}?filename=${filename}`);

export {
  projectMilestonesService,
  submitMilestoneService,
  acceptMilestoneService,
  milestoneFileUploadService,
  milestoneTransactionsServiceForClient,
  milestoneTransactionsServiceForTeam,
};
