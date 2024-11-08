import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const verifyInfraAccessService = () => DataService.get(API.projectDetails.verifyInfraAccess);

const getInfraService = (project_id) => DataService.get(`${API.projectDetails.getInfraData}/?project_id=${project_id}`);

const createInfraService = (project_id, services_selected = []) =>
  DataService.post(`${API.projectDetails.createInfra}?project_id=${project_id}`, services_selected);

const terminateInfraService = (project_id) =>
  DataService.put(`${API.projectDetails.terminateInfra}?project_id=${project_id}`);

export { verifyInfraAccessService, getInfraService, createInfraService, terminateInfraService };
