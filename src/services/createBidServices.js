import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const checkBidService = (projectId) => DataService.get(`${API.createBid.checkBid}?project_id=${projectId}`);

const createBidService = (projectId, bidType) =>
  DataService.post(`${API.createBid.createBid}?project_id=${projectId}&bid_type=${bidType}`);

const projectDetailsService = (projectId) => DataService.get(`${API.createBid.projectInfo}?project_id=${projectId}`);

const bidDetailsService = (bidId) => DataService.get(`${API.createBid.bidInfo}?bid_id=${bidId}`);

const rolesService = (projectId) => DataService.get(`${API.createBid.roles}?project_id=${projectId}`);

const setWorkersService = (bidId, data) => DataService.put(`${API.createBid.setWorkers}?bid_id=${bidId}`, data);

const setMilestonesService = (projectId, bidId, data) =>
  DataService.post(`${API.createBid.setMilestones}?project_id=${projectId}&bid_id=${bidId}`, data);

const milestoneFileUploadService = (filename) =>
  DataService.get(`${API.createBid.milestoneFileUpload}?filename=${filename}`);

const milestoneFileUploadToAzureService = (url, data, headers) => DataService.putWithoutToken(url, data, headers);

const submitBidService = (bidId) => DataService.put(`${API.createBid.submitBid}?bid_id=${bidId}`);

const changeBidTypeService = (bidId, bidType) =>
  DataService.put(`${API.createBid.changeBidType}?bid_id=${bidId}&bid_type=${bidType}`);

export {
  checkBidService,
  createBidService,
  projectDetailsService,
  bidDetailsService,
  rolesService,
  setWorkersService,
  setMilestonesService,
  milestoneFileUploadService,
  milestoneFileUploadToAzureService,
  submitBidService,
  changeBidTypeService,
};
