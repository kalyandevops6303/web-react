/* eslint-disable no-else-return */
import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const checkBidService = (projectId, teamId) => {
  if (teamId) {
    return DataService.get(`${API.createBid.checkBid}?project_id=${projectId}&team_id=${teamId}`);
  } else {
    return DataService.get(`${API.createBid.checkBid}?project_id=${projectId}`);
  }
};

const createBidService = (projectId, bidType, teamId) => {
  if (teamId) {
    return DataService.post(`${API.createBid.createBid}?project_id=${projectId}&bid_type=${bidType}&team_id=${teamId}`);
  } else {
    return DataService.post(`${API.createBid.createBid}?project_id=${projectId}&bid_type=${bidType}`);
  }
};

const projectDetailsService = (projectId) => DataService.get(`${API.createBid.projectInfo}?project_id=${projectId}`);

const bidDetailsService = (bidId, teamId) => {
  if (teamId) {
    return DataService.get(`${API.createBid.bidInfo}?bid_id=${bidId}&team_id=${teamId}`);
  } else {
    return DataService.get(`${API.createBid.bidInfo}?bid_id=${bidId}`);
  }
};

const rolesService = (projectId, teamId) =>
  DataService.get(`${API.createBid.roles}?project_id=${projectId}&team_id=${teamId}`);

const setWorkersService = (bidId, teamId, data) =>
  DataService.put(`${API.createBid.setWorkers}?bid_id=${bidId}&team_id=${teamId}`, data);

const setMilestonesService = (projectId, bidId, teamId, data) => {
  if (teamId) {
    return DataService.post(
      `${API.createBid.setMilestones}?project_id=${projectId}&bid_id=${bidId}&team_id=${teamId}`,
      data,
    );
  } else {
    return DataService.post(`${API.createBid.setMilestones}?project_id=${projectId}&bid_id=${bidId}`, data);
  }
};

const milestoneFileUploadService = (filename) =>
  DataService.get(`${API.createBid.milestoneFileUpload}?filename=${filename}`);

const milestoneFileUploadToAzureService = (url, data, headers) => DataService.putWithoutToken(url, data, headers);

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
};
