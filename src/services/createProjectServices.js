import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const createProjectService = ({ projectId, data }) => {
  if (projectId) {
    return DataService.post(`${API.createProject.createProject}?project_id=${projectId}`, data);
  }
  return DataService.post(API.createProject.createProject, data);
};

const createProjectAIService = (data) => DataService.post(API.createProject.createProjectAI, data);

const bestTalentsService = (projectId, searchText, page, pageSize) =>
  DataService.get(
    `${API.createProject.bestTalents}?project_id=${projectId}&search_text=${searchText}&page=${page}&page_size=${pageSize}`,
  );

const favoriteTalentsService = (projectId, searchText, page, pageSize) =>
  DataService.get(
    `${API.createProject.favoriteTalents}?project_id=${projectId}&search_text=${searchText}&page=${page}&page_size=${pageSize}`,
  );

const favoriteTeamsService = (projectId, searchText, page, pageSize) =>
  DataService.get(
    `${API.createProject.favoriteTeams}?project_id=${projectId}&search_text=${searchText}&page=${page}&page_size=${pageSize}`,
  );

const almaMaterTalentsService = (projectId, searchText, page, pageSize) =>
  DataService.get(
    `${API.createProject.almaMaterTalents}?project_id=${projectId}&search_text=${searchText}&page=${page}&page_size=${pageSize}`,
  );

const inviteTalentsService = (projectId, data) =>
  DataService.post(`${API.createProject.inviteTalents}?project_id=${projectId}`, data);

const projectFileUploadService = (filename) =>
  DataService.get(`${API.createProject.projectFileUpload}?filename=${filename}`);

const projectFileUploadToAzureService = (url, data, headers) => DataService.putWithoutToken(url, data, headers);

const saveDraftProjectService = ({ projectId, data }) => {
  if (projectId) {
    return DataService.post(`${API.createProject.saveDraftProject}?project_id=${projectId}`, data);
  }
  return DataService.post(API.createProject.saveDraftProject, data);
};

const draftProjectsCheckService = () => DataService.get(API.createProject.draftProjectsCheck);

const deleteDraftProjectService = (projectId) =>
  DataService.delete(`${API.createProject.deleteDraftProject}?project_id=${projectId}`);

const draftProjectDetailsService = (projectId) =>
  DataService.get(`${API.projectDetails.getProjectDetails}?project_id=${projectId}`);

export {
  createProjectService,
  createProjectAIService,
  bestTalentsService,
  favoriteTalentsService,
  favoriteTeamsService,
  almaMaterTalentsService,
  inviteTalentsService,
  projectFileUploadService,
  projectFileUploadToAzureService,
  saveDraftProjectService,
  draftProjectsCheckService,
  deleteDraftProjectService,
  draftProjectDetailsService,
};
