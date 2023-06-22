import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const createProjectService = (data) => DataService.post(API.createProject.createProject, data);

const bestTalentsService = (projectId, searchText, page, pageSize) =>
  DataService.get(`${API.createProject.bestTalents}?project_id=${projectId}&page=${page}&page_size=${pageSize}`);

export { createProjectService, bestTalentsService };
