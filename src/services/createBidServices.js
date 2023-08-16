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

const bidDetailsService = (bidId, teamId) =>
  DataService.get(`${API.createBid.bidInfo}?bid_id=${bidId}&team_id=${teamId}`);

const rolesService = (projectId, teamId) =>
  DataService.get(`${API.createBid.roles}?project_id=${projectId}&team_id=${teamId}`);

export { checkBidService, createBidService, projectDetailsService, bidDetailsService, rolesService };
