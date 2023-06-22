import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const createProjectService = (data) => DataService.post(API.createProject.createProject, data);

export default createProjectService;
