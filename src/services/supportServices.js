import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const supportServive = (data) => DataService.post(API.support.create, data);

const getSupportCount = (data) => DataService.get(`${API.support.count}`, data);

const getIssueTypeService = () => DataService.get(`${API.static.issueTypes}`);

const getRequestsService = (data) => DataService.post(`${API.support.list}?page=1&page_size=100`, data)

const deleteRequestService = (data) => DataService.post(`${API.support.delete}/${data}`)

export { supportServive, getSupportCount, getIssueTypeService, getRequestsService, deleteRequestService };
