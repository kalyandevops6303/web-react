import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const createProjectService = (data) => DataService.post(API.createProject.createProject, data);

const bestTalentsService = (projectId, searchText, page, pageSize) =>
  DataService.get(
    `${API.createProject.bestTalents}?project_id=${projectId}&search_text=${searchText}&page=${page}&page_size=${pageSize}`,
  );

const favoriteTalentsService = (projectId, searchText, page, pageSize) =>
  DataService.get(
    `${API.createProject.favoriteTalents}?project_id=${projectId}&search_text=${searchText}&page=${page}&page_size=${pageSize}`,
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

export {
  createProjectService,
  bestTalentsService,
  favoriteTalentsService,
  almaMaterTalentsService,
  inviteTalentsService,
  projectFileUploadService,
  projectFileUploadToAzureService,
};
