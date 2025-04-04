import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const createSupportService = (data) => DataService.post(API.support.create, data);

const createSupportServiceForFlextern = (data) => DataService.post(API.support.createV2, data);

const getSupportCount = (data) => DataService.get(`${API.support.count}`, data);

const getIssueTypeService = () => DataService.get(`${API.static.issueTypes}`);

const getIssueTypeServiceForFlextern = () => DataService.get(`${API.static.issueTypesV2}`);

const getRequestsService = (data) => DataService.post(`${API.support.list}?page=1&page_size=100`, data);

const deleteRequestService = (data) => DataService.post(`${API.support.delete}/${data}`);

export {
  createSupportService,
  createSupportServiceForFlextern,
  getSupportCount,
  getIssueTypeService,
  getIssueTypeServiceForFlextern,
  getRequestsService,
  deleteRequestService,
};
