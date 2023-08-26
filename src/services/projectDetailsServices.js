import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const projectDetailsService = (projectId) =>
  DataService.get(`${API.projectDetails.getProjectDetails}?project_id=${projectId}`);

const getProjectTeamMemberServive = ({ project_id }) =>
  DataService.get(`${API.projectDetails.getProjectTeamMember}?project_id=${project_id}`);

const getReceivedBidsService = ({ project_id, metadata, search_text, bid_status }) => {
  if (bid_status) {
    return DataService.get(
      `${API.projectDetails.getReceivedBids}?project_id=${project_id}&page=${metadata?.page}&page_size=${metadata?.page_size}&search_text=${search_text}&bid_status=${bid_status}`,
    );
  }
  return DataService.get(
    `${API.projectDetails.getReceivedBids}?project_id=${project_id}&page=${metadata?.page}&page_size=${metadata?.page_size}&search_text=${search_text}`,
  );
};

const getBidDetailsService = ({ bid_id }) => DataService.put(`${API.projectDetails.getBidReview}?bid_id=${bid_id}`);

const getCommonBidDetailsService = ({ project_id }) =>
  DataService.get(`${API.projectDetails.commonBidInfo}?project_id=${project_id}`);

const updateBidStatusService = ({ bid_id, assign }) =>
  DataService.put(`${API.projectDetails.assignBid}?bid_id=${bid_id}&assign=${assign}`);

// eslint-disable-next-line import/prefer-default-export
export {
  projectDetailsService,
  getBidDetailsService,
  updateBidStatusService,
  getProjectTeamMemberServive,
  getReceivedBidsService,
  getCommonBidDetailsService,
};
