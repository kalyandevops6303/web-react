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

export { checkBidService, createBidService, projectDetailsService };
