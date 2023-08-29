import API from '../configs/api';
import DataService from '../configs/dataService/dataService';

const projectDetailsService = (projectId) =>
  DataService.get(`${API.projectDetails.getProjectDetails}?project_id=${projectId}`);

const getProjectTeamMemberServive = ({ project_id }) =>
  DataService.get(`${API.projectDetails.getProjectTeamMember}?project_id=${project_id}`);

const getUnassignedRoleService = ({ project_id }) =>
  DataService.get(`${API.projectDetails.unassignRole}?project_id=${project_id}`);

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

const getInvitedByService = ({ invitation_id }) =>
  DataService.get(`${API.projectDetails.getInvitaion}/${invitation_id}`);

const acceptInvitation = ({ id }) => DataService.put(`${API.projectDetails.accept}/${id}`);

const rejectInvitation = ({ id }) => DataService.put(`${API.projectDetails.reject}/${id}`);

export {
  acceptInvitation,
  rejectInvitation,
  getInvitedByService,
  projectDetailsService,
  getBidDetailsService,
  updateBidStatusService,
  getProjectTeamMemberServive,
  getReceivedBidsService,
  getCommonBidDetailsService,
  getUnassignedRoleService,
};
