import API from '../configs/api';
// eslint-disable-next-line import/no-cycle
import DataService from '../configs/dataService/dataService';

const bestTalentsService = (searchText, page, pageSize) =>
  DataService.get(`${API.inviteTeamMember.bestTalents}?search_text=${searchText}&page=${page}&page_size=${pageSize}`);

const favoriteTalentsService = (searchText, page, pageSize) =>
  DataService.get(
    `${API.inviteTeamMember.favoriteTalents}?search_text=${searchText}&page=${page}&page_size=${pageSize}`,
  );

const almaMaterTalentsService = (searchText, page, pageSize) =>
  DataService.get(
    `${API.inviteTeamMember.almaMaterTalents}?search_text=${searchText}&page=${page}&page_size=${pageSize}`,
  );

const inviteTalentsService = (data) => DataService.post(`${API.inviteTeamMember.sendInvitaion}`, data);

const inviteRequestService = (data) => DataService.post(`${API.inviteTeamMember.requests}`, data);
const validateUrlService = ({ token }) =>
  DataService.get(`${API.inviteTeamMember.validateRequest}?request_token=${token}`);

const getTeamMeberforInviteService = (searchText, page, pageSize, projectId) =>
  DataService.get(
    `${API.inviteTeamMember.getTeamMember}?search_text=${searchText}&page=${page}&page_size=${pageSize}&project_id=${projectId}`,
  );

const updateInvitationService = ({ action, request_id }) =>
  DataService.put(`${API.inviteTeamMember.requests}/${request_id}?action=${action}&request_id=${request_id}`);

const getRequestStatusService = ({ entity_type, entity_id }) =>
  DataService.get(`${API.inviteTeamMember.status}?entity_type=${entity_type}&entity_id=${entity_id}`);

const getAdminAccessService = () => DataService.get(`${API.inviteTeamMember.checkAdmin}`);
export {
  getAdminAccessService,
  getRequestStatusService,
  bestTalentsService,
  updateInvitationService,
  validateUrlService,
  inviteRequestService,
  getTeamMeberforInviteService,
  favoriteTalentsService,
  almaMaterTalentsService,
  inviteTalentsService,
};
