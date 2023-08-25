import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const projectDetailsService = (projectId) =>
  DataService.get(`${API.projectDetails.getProjectDetails}?project_id=${projectId}`);

// eslint-disable-next-line import/prefer-default-export
export { projectDetailsService };
