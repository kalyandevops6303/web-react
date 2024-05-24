import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const supportServive = (data) => DataService.post(API.support.create, data);

const getSupportCount = (data) => DataService.get(`${API.support.count}`, data);

const getIssueTypeService = () => DataService.get(`${API.static.issueTypes}`);

export { supportServive, getSupportCount, getIssueTypeService };
