import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const projectMilestonesService = (projectId) =>
  DataService.get(`${API.projectMilestones.getProjectMilestones}?project_id=${projectId}`);

const milestoneDetailService = (milestoneId) =>
  DataService.get(`${API.projectMilestones.getSingleMilestone}?milestone_id=${milestoneId}`);

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

const saveMilestoneService = (milestone_id, data) =>
  DataService.put(`${API.projectMilestones.saveMilestone}?milestone_id=${milestone_id}`, data);

const submitMilestoneService = ({ milestone_id, data }) =>
  DataService.put(`${API.projectMilestones.submitMilestone}?milestone_id=${milestone_id}`, data);

const acceptMilestoneService = (milestone_id) =>
  DataService.put(`${API.projectMilestones.acceptMilestone}?milestone_id=${milestone_id}`);

const rejectMilestoneService = (milestone_id) =>
  DataService.put(`${API.projectMilestones.rejectMilestone}?milestone_id=${milestone_id}`);

const milestoneFileUploadService = ({ file_name, project_id, milestone_id }) =>
  DataService.get(
    `${API.projectMilestones.projectFileUpload}?filename=${file_name}&project_id=${project_id}&milestone_id=${milestone_id}`,
  );

const getSubmissionHistoryService = ({ metaData, milestoneId }) =>
  DataService.get(
    `${API.projectMilestones.getSubmissionHistory}?milestone_id=${milestoneId}&page=${metaData?.page}&page_size=${metaData?.page_size}`,
  );

const markCompelteService = (milestone_id) =>
  DataService.put(`${API.projectMilestones.markComplete}?milestone_id=${milestone_id}`);

export {
  markCompelteService,
  submitMilestoneService,
  rejectMilestoneService,
  projectMilestonesService,
  saveMilestoneService,
  acceptMilestoneService,
  milestoneFileUploadService,
  milestoneTransactionsServiceForClient,
  milestoneTransactionsServiceForTeam,
  milestoneDetailService,
  getSubmissionHistoryService,
};
